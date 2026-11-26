(function(){
  const config=window.CIRCL_CONFIG||{};
  const intro=document.getElementById('intro');
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function finishIntro(){if(intro){intro.classList.add('done');document.body.classList.remove('locked');}}
  if(intro){document.body.classList.add('locked');if(reduceMotion){finishIntro();}else{const t=setTimeout(finishIntro,4900);document.getElementById('skipIntro')?.addEventListener('click',()=>{clearTimeout(t);finishIntro();});}}
  document.getElementById('year')?.append(String(new Date().getFullYear()));
  const toggle=document.getElementById('menuToggle'),nav=document.getElementById('mainNav');
  toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav?.classList.toggle('open',open);});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');}));
  const revealItems=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduceMotion){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.12});revealItems.forEach(el=>io.observe(el));}else revealItems.forEach(el=>el.classList.add('visible'));
  document.querySelectorAll('[data-instagram]').forEach(a=>{a.href=config.instagramUrl||'https://www.instagram.com/';a.target='_blank';a.rel='noopener noreferrer';});
  // Referral IDs are campaign identifiers, not personal identifiers. No cookies or fingerprinting are used.
  const params=new URLSearchParams(location.search),ref=params.get('ref'),campaign=params.get('campaign');
  if(ref && /^[a-zA-Z0-9_-]{1,60}$/.test(ref)){
    const event={event:'circl_referral_click',ref:ref,campaign:campaign&&/^[a-zA-Z0-9_-]{1,60}$/.test(campaign)?campaign:null,landing:location.pathname,occurredAt:new Date().toISOString()};
    try{sessionStorage.setItem('circl_referral',JSON.stringify(event));}catch(e){}
    // Optional analytics endpoint can be configured later; do not transmit data until one is supplied.
    if(config.analyticsEndpoint){try{fetch(config.analyticsEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(event),keepalive:true}).catch(()=>{});}catch(e){}}
  }
  document.querySelectorAll('[data-join-instagram]').forEach(a=>{a.href=config.channelUrl||config.instagramUrl||'https://www.instagram.com/';a.target='_blank';a.rel='noopener noreferrer';});
})();