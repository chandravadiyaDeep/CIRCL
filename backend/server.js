import http from "node:http";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const PORT = Number(process.env.PORT || 10000);
const DATA_DIR = process.env.DATA_DIR || "/var/data";
const DATA_FILE = path.join(DATA_DIR, "applications.json");
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const EMAIL_FROM = process.env.EMAIL_FROM || "";
const EMAIL_TO = process.env.EMAIL_TO || "deepchandravadiya593@gmail.com";
const ALLOWED_ORIGINS = new Set([
  "https://chandraviyadeep.github.io",
  "http://localhost:5173",
  "http://127.0.0.1:5173"
]);
const rateLimits = new Map();
let writeQueue = Promise.resolve();

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  });
  res.end(JSON.stringify(payload));
}

function getClientIp(req) {
  // Render supplies this header. It is used only for basic abuse throttling.
  return req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
}

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const current = rateLimits.get(ip);
  if (!current || now - current.startedAt > windowMs) {
    rateLimits.set(ip, { startedAt: now, count: 1 });
    return true;
  }
  current.count += 1;
  return current.count <= 5;
}

async function readBody(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 20_000) throw new Error("Request is too large.");
  }
  return JSON.parse(raw || "{}");
}

function clean(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validateApplication(input) {
  const application = {
    id: randomUUID(),
    submittedAt: new Date().toISOString(),
    name: clean(input.name, 120),
    email: clean(input.email, 254).toLowerCase(),
    instagram: clean(input.instagram, 80).replace(/^@/, ""),
    category: clean(input.category, 100),
    followers: clean(input.followers, 50),
    location: clean(input.location, 120),
    reason: clean(input.reason, 3000),
    status: "new"
  };
  if (!application.name || !application.email || !application.instagram ||
      !application.category || !application.followers || !application.reason) {
    throw new Error("Please complete all required application fields.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(application.email)) {
    throw new Error("Please enter a valid email address.");
  }
  if (!/^[a-zA-Z0-9._]{1,30}$/.test(application.instagram)) {
    throw new Error("Please enter a valid Instagram username.");
  }
  return application;
}

async function saveApplication(application) {
  // Serialize writes so simultaneous submissions do not overwrite each other.
  const operation = writeQueue.then(async () => {
    await mkdir(DATA_DIR, { recursive: true });
    let applications = [];
    try {
      applications = JSON.parse(await readFile(DATA_FILE, "utf8"));
      if (!Array.isArray(applications)) applications = [];
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    applications.push(application);
    const tempFile = DATA_FILE + ".tmp";
    await writeFile(tempFile, JSON.stringify(applications, null, 2) + "\n", { mode: 0o600 });
    await rename(tempFile, DATA_FILE);
  });
  writeQueue = operation.catch(() => {});
  return operation;
}

async function sendApplicationEmail(application) {
  if (!RESEND_API_KEY || !EMAIL_FROM) {
    return { sent: false, reason: "Email service is not configured yet." };
  }
  const text = [
    "A new CIRCL founding creator application was submitted.",
    "",
    `Application ID: ${application.id}`,
    `Submitted: ${application.submittedAt}`,
    `Full name: ${application.name}`,
    `Contact email: ${application.email}`,
    `Instagram: @${application.instagram}`,
    `Content category: ${application.category}`,
    `Follower range: ${application.followers}`,
    `Primary audience location: ${application.location || "Not provided"}`,
    "",
    "What they create and why they want to join CIRCL:",
    application.reason
  ].join("\n");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: [EMAIL_TO],
      reply_to: application.email,
      subject: `CIRCL creator application — @${application.instagram}`,
      text
    })
  });
  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Email provider returned ${response.status}: ${details.slice(0, 300)}`);
  }
  return { sent: true };
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return sendJson(res, 403, { error: "Origin not allowed." });
  }
  res.setHeader("Access-Control-Allow-Origin", origin || "https://chandraviyadeep.github.io");
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  if (req.method === "GET" && url.pathname === "/health") {
    return sendJson(res, 200, { ok: true, service: "CIRCL applications API" });
  }

  if (req.method === "GET" && url.pathname === "/api/admin/applications") {
    const suppliedKey = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
    if (!ADMIN_API_KEY || suppliedKey !== ADMIN_API_KEY) {
      return sendJson(res, 401, { error: "Unauthorized." });
    }
    try {
      await writeQueue;
      const contents = await readFile(DATA_FILE, "utf8").catch(error => error.code === "ENOENT" ? "[]" : Promise.reject(error));
      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": 'attachment; filename="circl-applications.json"',
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff"
      });
      return res.end(contents);
    } catch {
      return sendJson(res, 500, { error: "Could not read the applications file." });
    }
  }

  if (req.method === "POST" && url.pathname === "/api/applications") {
    if (!checkRateLimit(getClientIp(req))) {
      return sendJson(res, 429, { error: "Too many submissions. Please try again later." });
    }
    try {
      const input = await readBody(req);
      // Honeypot: quietly accept automated spam without storing it.
      if (clean(input.website, 200)) return sendJson(res, 201, { ok: true });
      const application = validateApplication(input);
      await saveApplication(application);
      try {
        await sendApplicationEmail(application);
        return sendJson(res, 201, { ok: true, saved: true, emailed: true, id: application.id });
      } catch (emailError) {
        console.error("Application saved, but notification email failed:", emailError.message);
        return sendJson(res, 202, {
          ok: true,
          saved: true,
          emailed: false,
          id: application.id,
          message: "Your application was saved, but the email notification is delayed."
        });
      }
    } catch (error) {
      const status = error instanceof SyntaxError || error.message.includes("required") ||
        error.message.includes("valid") || error.message.includes("large") ? 400 : 500;
      console.error("Application submission error:", error.message);
      return sendJson(res, status, { error: status === 400 ? error.message : "We could not save your application. Please try again." });
    }
  }

  return sendJson(res, 404, { error: "Not found." });
});

server.listen(PORT, () => {
  console.log(`CIRCL applications API listening on port ${PORT}`);
});
