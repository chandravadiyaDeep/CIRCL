import { useEffect, useState, type ReactNode, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, CircleDot, Menu, MoveUpRight, Sparkles, X } from "lucide-react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

const instagramUrl = "https://www.instagram.com/"; // Replace with the official CIRCL profile before launch.

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } } };

function Intro() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [closed, setClosed] = useState(Boolean(reduceMotion));
  const lines = ["A new way to connect.", "Different voices. One circle.", "Discover beyond your feed.", "Growth, shared naturally."];
  useEffect(() => {
    if (reduceMotion || closed) return;
    const timer = window.setInterval(() => setStep((current) => current + 1), 2400);
    const finish = window.setTimeout(() => setClosed(true), 10000);
    return () => { window.clearInterval(timer); window.clearTimeout(finish); };
  }, [closed, reduceMotion]);
  return <AnimatePresence>{!closed && <motion.div className="intro-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.8 } }}>
    <div className="intro-center">
      <div className="brand-mark intro-mark"><span /><span /></div>
      <motion.div className="intro-name" initial={{ letterSpacing: "0.35em", opacity: 0 }} animate={{ letterSpacing: "0.18em", opacity: 1 }} transition={{ duration: 1.2 }}>CIRCL<span>®</span></motion.div>
      <div className="intro-copy" aria-live="polite"><AnimatePresence mode="wait"><motion.p key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }}>{lines[Math.min(step, lines.length - 1)]}</motion.p></AnimatePresence></div>
      <div className="intro-track"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 9.4, ease: "linear" }} /></div>
    </div>
    <button className="intro-skip" onClick={() => setClosed(true)}>Skip introduction <ArrowUpRight size={13} /></button>
  </motion.div>}</AnimatePresence>;
}

function Brand({ light = false }: { light?: boolean }) {
  return <Link to="/" className={"brand " + (light ? "brand-light" : "")} aria-label="CIRCL home"><span className="brand-mark"><i /><i /></span><span className="brand-word">CIRCL<span>®</span></span></Link>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  const scrollTo = (id: string) => {
    setOpen(false);
    if (location.pathname !== "/") { window.location.hash = "/"; window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 120); }
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return <header className="header"><div className="header-inner"><Brand />
    <nav className={open ? "nav nav-open" : "nav"}>
      <button onClick={() => scrollTo("philosophy")}>The philosophy</button><button onClick={() => scrollTo("network")}>The network</button><button onClick={() => scrollTo("method")}>How it works</button><Link to="/transparency">Transparency</Link><Link to="/guidelines">Our standards</Link>
    </nav>
    <div className="header-actions"><Link className="header-join" to="/join">Join CIRCL <ArrowUpRight size={14} /></Link><button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button></div>
  </div></header>;
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} variants={fadeUp} initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.14 }}>{children}</motion.div>;
}
function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <div className={"eyebrow " + (light ? "eyebrow-light" : "")}><span />{children}</div>;
}

function Home() {
  return <>
    <Intro /><Header />
    <main>
      <section className="hero">
        <div className="hero-image" role="img" aria-label="Editorial fashion portrait in monochrome"><div className="hero-image-shade" /><div className="hero-image-caption"><span>INDEPENDENT CREATOR NETWORK</span><span>EST. 2026 · INDIA</span></div><div className="hero-image-index">01 — 04</div></div>
        <div className="hero-content"><Eyebrow>THE ART OF GROWING TOGETHER</Eyebrow><h1>Good things<br />happen in a <em>circle.</em></h1><p className="hero-description">A considered network of creators, connected by shared discovery, creative exchange and the belief that growth feels better together.</p>
          <div className="hero-buttons"><Link to="/join" className="button button-black">Become a founding creator <ArrowUpRight size={15} /></Link><button className="button-text" onClick={() => document.getElementById("philosophy")?.scrollIntoView({ behavior: "smooth" })}>Discover CIRCL <ArrowDown size={14} /></button></div>
          <div className="hero-footnote"><span className="tiny-ring" /> ORGANIC BY NATURE. COLLABORATIVE BY DESIGN.</div>
        </div><div className="hero-side-label">A NEW CULTURE OF CONNECTION — 001</div>
      </section>

      <section className="manifesto section-pad" id="philosophy"><div className="manifesto-top"><Eyebrow>01 / OUR PHILOSOPHY</Eyebrow><span className="section-aside">A NETWORK, NOT A NUMBERS GAME.</span></div>
        <Reveal className="manifesto-copy"><h2>Not another platform<br />asking for attention.<br /><em>A network that shares it.</em></h2><div className="manifesto-bottom"><p>Every creator has a point of view. Every audience has its own interests. CIRCL brings those worlds closer — making discovery feel more human, more relevant and more rewarding.</p><Link to="/about" className="underlined-link">The story behind CIRCL <ArrowUpRight size={14} /></Link></div></Reveal>
      </section>

      <section className="editorial section-pad" id="network"><div className="editorial-heading"><Eyebrow>02 / THE NETWORK</Eyebrow><h2>Different worlds.<br /><em>One shared space.</em></h2><p>From personal style to everyday rituals, we bring together creators whose perspectives deserve to travel further.</p></div>
        <div className="category-grid">
          <Reveal className="category-card"><div className="category-photo photo-fashion" /><div className="category-meta"><span>01 / STYLE</span><h3>Fashion &<br />personal style</h3><ArrowUpRight size={18} /></div></Reveal>
          <Reveal className="category-card category-offset"><div className="category-photo photo-lifestyle" /><div className="category-meta"><span>02 / EVERYDAY</span><h3>Daily<br />living</h3><ArrowUpRight size={18} /></div></Reveal>
          <Reveal className="category-card category-low"><div className="category-photo photo-beauty" /><div className="category-meta"><span>03 / EXPRESSION</span><h3>Beauty &<br />grooming</h3><ArrowUpRight size={18} /></div></Reveal>
        </div><div className="category-note"><span>CURATED CREATORS, NOT CROWDED FEEDS.</span><span>INDIA / FIRST CIRCLE</span></div>
      </section>

      <section className="statement-band"><div className="statement-photo" /><div className="statement-copy"><Eyebrow light>THE CIRCL PRINCIPLE</Eyebrow><h2>Reach is an outcome.<br /><em>Connection is the beginning.</em></h2><p>We don't promise a number. We create the conditions for meaningful discovery — through introductions, shared stories and creative collaborations.</p><Link to="/transparency" className="light-link">How we measure what matters <ArrowUpRight size={14} /></Link></div></section>

      <section className="method section-pad" id="method"><div className="method-intro"><Eyebrow>03 / THE METHOD</Eyebrow><h2>Simple by design.<br /><em>Powerful together.</em></h2><p>One Instagram-first network. A clear process. Room for every creator to bring their own voice.</p><Link to="/how-it-works" className="underlined-link">Explore the process <ArrowUpRight size={14} /></Link></div>
        <div className="method-steps">{[["01","Come into the circle","Creators join a shared network built on relevance, respect and mutual participation."],["02","Invite your people","Share your personal CIRCL invitation with your Instagram audience — in your own voice."],["03","Discover each other","Explore creator stories, profiles and perspectives. Follow only the voices that genuinely interest you."],["04","Make something together","Create collaborative Reels, introductions and content that brings different communities closer."]].map(([n,title,copy]) => <Reveal key={n} className="method-step"><span className="step-number">{n}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight size={17} /></Reveal>)}</div>
      </section>

      <section className="feature-spread"><div className="feature-photo" /><div className="feature-copy"><Eyebrow>04 / THE CREATOR EXPERIENCE</Eyebrow><h2>Your next<br />connection could<br />change <em>everything.</em></h2><p>Be part of a network where your work is seen in new contexts, your ideas meet new perspectives and collaboration becomes part of the creative journey.</p><div className="feature-points"><span><Check size={14} /> Relevant creator introductions</span><span><Check size={14} /> Collaborative content opportunities</span><span><Check size={14} /> Clear participation standards</span><span><Check size={14} /> Transparent campaign reporting</span></div><Link to="/join" className="button button-black">Apply for the first circle <ArrowUpRight size={15} /></Link></div></section>

      <section className="trust-section section-pad"><div className="trust-head"><Eyebrow>05 / BUILT ON TRUST</Eyebrow><h2>Nothing hidden.<br /><em>Nothing artificial.</em></h2><p>Trust is built through clear expectations and honest reporting. Here is what CIRCL stands for.</p></div>
        <div className="trust-grid"><Reveal className="trust-card"><span>01</span><CircleDot size={22} /><h3>Organic discovery</h3><p>No bought followers, forced follows or artificial engagement. People choose who they follow.</p></Reveal><Reveal className="trust-card"><span>02</span><Sparkles size={22} /><h3>Creator ownership</h3><p>Your content stays yours. Reuse and reposting require your permission.</p></Reveal><Reveal className="trust-card"><span>03</span><MoveUpRight size={22} /><h3>Visible measurement</h3><p>We explain the source and limits of every metric we report.</p></Reveal></div><Link to="/transparency" className="underlined-link">Read our transparency principles <ArrowUpRight size={14} /></Link>
      </section>

      <section className="closing"><div className="closing-mark"><span /><span /></div><Eyebrow light>THE FIRST CIRCLE STARTS WITH YOU</Eyebrow><h2>Make your world<br /><em>a little bigger.</em></h2><p>Bring your perspective. Find your people. Let's build something meaningful.</p><Link to="/join" className="button button-white">Join the founding circle <ArrowUpRight size={15} /></Link><span className="closing-caption">CIRCL® — INDEPENDENT CREATOR NETWORK / INDIA</span></section>
    </main><Footer />
  </>;
}

function Footer() {
  return <footer className="footer"><div className="footer-main"><div><Brand light /><p>A circle of creators.<br />A culture of shared discovery.</p></div><div className="footer-column"><span>EXPLORE</span><Link to="/about">Our story</Link><Link to="/how-it-works">How it works</Link><Link to="/join">Become a creator</Link></div><div className="footer-column"><span>PRINCIPLES</span><Link to="/guidelines">Creator standards</Link><Link to="/transparency">Transparency</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div><div className="footer-column"><span>CONNECT</span><a href={instagramUrl} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={12} /></a><a href="mailto:contact@circl.community">Contact <ArrowUpRight size={12} /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} CIRCL. ALL RIGHTS RESERVED.</span><span>INDEPENDENT BY DESIGN. CONNECTED BY CHOICE.</span></div></footer>;
}

const pageContent: Record<string, { tag: string; title: string; intro: string; blocks: [string,string][] }> = {
  about:{tag:"THE STORY",title:"A different kind of growth culture.",intro:"CIRCL is an independent creator network connecting India's fashion and lifestyle voices through organic discovery, collaboration and shared community.",blocks:[["The idea","Creators already build communities around their own perspectives. CIRCL creates thoughtful connections between those communities, giving audiences more ways to discover people and content they may genuinely enjoy."],["Our point of view","We believe growth should be earned through relevance, creativity and real audience interest. We do not sell followers, promise specific results or ask people to follow creators in exchange for access."],["Our first circle","We are beginning with Instagram and lifestyle-led creators in India — fashion, personal style, daily living, beauty and grooming. Our first priority is building a healthy network and making collaboration easier."],["What we are not","CIRCL is not a follower exchange, engagement pod, paid-growth service or guarantee of reach. It is a structured network for introductions, collaborative content and transparent organic discovery."]]},
  "how-it-works":{tag:"THE PROCESS",title:"One circle. Four ways to connect.",intro:"A simple Instagram-first process that brings creators together and gives audiences more ways to discover content.",blocks:[["01 — Creators join","Creators apply to participate. CIRCL reviews content relevance, profile authenticity and willingness to collaborate. Acceptance is not automatic."],["02 — Share an invitation","Participating creators may share their unique CIRCL invitation link through an Instagram Story, profile link or another agreed placement."],["03 — Audiences discover","CIRCL introduces participating creators and shares relevant updates. Members can explore profiles and choose who they want to follow. Following every creator is never required."],["04 — Collaborate and learn","Creators can propose joint Reels, Collab posts and introductions. Each creator approves their own participation and content before publication. Available campaign metrics are reviewed transparently."]]},
  transparency:{tag:"OUR COMMITMENT",title:"Trust is measured in clarity.",intro:"We share what we measure, where the data comes from and where attribution has limits. No inflated claims. No guaranteed growth promises.",blocks:[["What we can measure","Story reach and link taps from creator-provided Instagram Insights; referral-link clicks recorded by the CIRCL website; Broadcast Channel membership changes where available; and Reels reach and interactions from Instagram Insights."],["What a link tells us","A unique referral code can tell us that a visitor clicked a creator's invitation link. A click is not proof that the visitor joined a channel or followed a creator."],["Attribution has limits","Instagram does not provide CIRCL with a complete person-level journey from a website click to a channel join and then a creator follow. Channel growth during a campaign is a time-window comparison, not proof that every new member came from a particular creator."],["Data minimisation","Referral identifiers should not contain personal information. CIRCL does not need Instagram passwords, private-message access or follower lists to operate its initial network. We do not use hidden fingerprinting or sell audience data."]]},
  guidelines:{tag:"THE CIRCL STANDARD",title:"A shared network. Shared responsibility.",intro:"These founding creator standards explain how CIRCL participation works. Each creator confirms the final agreement during onboarding.",blocks:[["Participation","Creators participate voluntarily and contribute to activities they have accepted. There is no compulsory follow-for-follow. Participation does not guarantee followers, reach or a particular outcome."],["Promotion","Creator features are fair, relevant and approved. Spam, fake giveaways, misleading claims and unapproved paid advertisements are not permitted."],["Community conduct","Treat creators and members respectfully. Harassment, discrimination, threats, spam and deceptive engagement tactics are not permitted."],["Content ownership","Creators retain ownership of original content. CIRCL and other creators must obtain permission before downloading, editing, reposting or reusing creator-owned content."],["CIRCL spaces","CIRCL owns and manages its official Instagram account, website and Broadcast Channel. Participation does not grant account ownership or unrestricted posting rights."],["Leaving the network","A creator may request to leave at any time. CIRCL may pause or end participation for rule violations, safety concerns or misuse of the network."]]},
  privacy:{tag:"YOUR PRIVACY",title:"Your information deserves care.",intro:"This is a summary of CIRCL's intended privacy approach. The final policy must identify the actual operator, contact details, service providers and retention periods before public applications open.",blocks:[["Information collected","A creator application may request a name, Instagram handle, profile URL, content category, approximate follower range, audience location and contact email. Referral links may record a non-personal referral code, campaign code, page path and click timestamp."],["How it is used","Application details are used to review and manage creator participation. Referral and campaign information is used to understand campaign activity and prepare reports."],["What we never need","CIRCL does not need your Instagram password, authentication code, private messages or a list of your followers. Never send these details."],["Retention and contact","Information should be retained only as long as needed for the stated purpose and applicable requirements. A monitored privacy contact and deletion request process must be configured before public applications open."]]},
  terms:{tag:"TERMS OF USE",title:"Clear terms. Better connections.",intro:"These draft terms cover use of the CIRCL website. Creator participation is also governed by the separately accepted Creator Agreement.",blocks:[["Use of the website","Use this website lawfully and respectfully. Do not attempt to disrupt the website, probe systems without authorization or submit malicious content."],["No growth guarantee","CIRCL provides opportunities for organic discovery and collaboration. It does not promise follower counts, views, reach, engagement or channel joins. Platform distribution and audience behaviour are outside CIRCL's control."],["Creator content","Creators retain rights to their own content. Application or participation does not transfer ownership to CIRCL. Any permission to feature or reuse content should be specific and documented."],["Third-party platforms","Instagram is a third-party service. Its features, eligibility, availability and policies may change, and use is subject to Instagram's own terms."],["Legal details","The operator's legal name, contact address and appropriate governing-law details must be completed and reviewed for applicable Indian law before public launch."]]}
};

function InfoPage({ page }: { page: string }) {
  const data = pageContent[page];
  if (!data) return <div className="not-found"><h1>That page isn't in this circle.</h1><Link to="/" className="button button-black">Return home <ArrowLeft size={15} /></Link></div>;
  return <><Header /><main className="info-page"><section className="info-hero"><Eyebrow light>{data.tag}</Eyebrow><h1>{data.title}</h1><p>{data.intro}</p></section><section className="info-body">{data.blocks.map(([title,copy],i)=><Reveal key={title} className="info-block"><span>{String(i+1).padStart(2,"0")}</span><div><h2>{title}</h2><p>{copy}</p></div></Reveal>)}<div className="info-back"><Link to="/" className="underlined-link"><ArrowLeft size={14} /> Back to CIRCL</Link></div></section></main><Footer /></>;
}

function JoinPage() {
  const [form,setForm]=useState({name:"",email:"",instagram:"",category:"",followers:"",location:"",reason:""});
  const [copied,setCopied]=useState(false);
  const update=(key:keyof typeof form,value:string)=>setForm(old=>({...old,[key]:value}));
  const submit=async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const message=["CIRCL — Founding Creator Application","",...Object.entries(form).map(([key,value])=>key.toUpperCase()+": "+value)].join("\n");
    try{await navigator.clipboard.writeText(message);setCopied(true);}
    catch{setCopied(false);window.alert("Please copy your application details and contact CIRCL through Instagram.");}
  };
  return <><Header /><main className="join-page"><section className="info-hero join-hero"><Eyebrow light>THE FOUNDING CIRCLE / APPLICATION</Eyebrow><h1>There is room<br />for your <em>point of view.</em></h1><p>Tell us what you create. We are bringing together the first group of independent creators across India.</p></section><section className="join-content"><div className="join-aside"><span>THE FIRST CIRCLE</span><h2>Come as you are.<br /><em>Contribute what you do.</em></h2><p>Participation is voluntary. We review applications for relevance, authenticity and a genuine interest in collaboration. There is no follower-count promise.</p><div className="join-aside-note"><Check size={15} /> No follow-for-follow<br /><Check size={15} /> No paid follower schemes<br /><Check size={15} /> Your content stays yours</div></div><form className="creator-form" onSubmit={submit}><div className="form-title form-wide"><span>01 — YOUR DETAILS</span><p>All fields marked * are required.</p></div>
    <label>Full name *<input required value={form.name} onChange={e=>update("name",e.target.value)} placeholder="Your name" /></label><label>Contact email *<input required type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="you@example.com" /></label><label>Instagram username *<input required value={form.instagram} onChange={e=>update("instagram",e.target.value)} placeholder="@yourhandle" /></label>
    <label>Content category *<select required value={form.category} onChange={e=>update("category",e.target.value)}><option value="">Choose your world</option><option>Fashion & personal style</option><option>Daily lifestyle</option><option>Beauty & grooming</option><option>Other lifestyle content</option></select></label>
    <label>Follower range *<select required value={form.followers} onChange={e=>update("followers",e.target.value)}><option value="">Select range</option><option>Under 1,000</option><option>1,000–5,000</option><option>5,001–10,000</option><option>10,001–25,000</option><option>25,001–50,000</option><option>50,001–100,000</option><option>100,000+</option></select></label><label>Primary audience location<input value={form.location} onChange={e=>update("location",e.target.value)} placeholder="City / State / India" /></label>
    <label className="form-wide">What do you create, and why CIRCL? *<textarea required value={form.reason} onChange={e=>update("reason",e.target.value)} placeholder="Tell us about your content and what you would bring to the network." rows={4} /></label><label className="consent form-wide"><input required type="checkbox" /><span>I have read the <Link to="/guidelines">Creator Guidelines</Link> and <Link to="/privacy">Privacy Policy</Link>. I understand that organic growth is not guaranteed.</span></label>
    <button className="button button-black form-wide" type="submit">Prepare my application <ArrowUpRight size={15} /></button>{copied&&<p className="form-success form-wide"><Check size={15} /> Application copied. Send it to CIRCL through its official Instagram contact. Your details have not been uploaded.</p>}<p className="form-note form-wide">This form currently prepares your application locally. It does not send or store your personal information. A secure application service will be connected before public onboarding.</p>
  </form></section></main><Footer /></>;
}

function ScrollReset(){const location=useLocation();useEffect(()=>{window.scrollTo({top:0,behavior:"auto"});},[location.pathname]);return null;}
function InfoRoute(){const location=useLocation();return <InfoPage page={location.pathname.replace("/","")} />;}
export default function App(){return <><ScrollReset /><Routes><Route path="/" element={<Home />} /><Route path="/join" element={<JoinPage />} /><Route path="/:page" element={<InfoRoute />} /><Route path="*" element={<InfoPage page="not-found" />} /></Routes></>;}
