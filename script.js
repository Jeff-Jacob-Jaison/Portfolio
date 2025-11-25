/* ================================
  SCRIPT: NAV APPEAR, SCROLL REVEAL,
  AUTO SKILLS CAROUSEL (glitch-free),
  WAIT FOR IMAGES THEN START
=================================*/

/* NAVBAR slide down on load */
window.addEventListener('load', ()=> {
  const header = document.getElementById('siteHeader');
  if(header) header.classList.add('visible');
});

/* Simple scroll reveal using IntersectionObserver */
(function(){
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries)=> {
    entries.forEach(en => {
      if(en.isIntersecting) {
        en.target.style.opacity = 1;
        en.target.style.transform = 'none';
        obs.unobserve(en.target);
      }
    });
  }, {threshold: 0.15});

  reveals.forEach(el=>{
    el.style.opacity = 0;
    el.style.transform = 'translateY(18px)';
    obs.observe(el);
  });
})();

/* -----------------------------
   SKILLS: AUTO-GENERATED INFINITE CAROUSEL
   - builds A + A
   - waits for images to load before animating
   - perfect seamless loop
------------------------------*/
(function(){
  const skills = [
    "html","css","javascript","nodejs","mysql","canva","figma","git",
    "java","dbms","sql","ds","python","ml","c","cpp"
  ];

  const track = document.getElementById('skillsTrack');
  if(!track) return;

  function createSkillCard(name){
    const wrapper = document.createElement('div');
    wrapper.className = 'skill-flip';
    wrapper.innerHTML = `
      <div class="flip-inner">
        <div class="flip-front"><img src="icons/${name}.png" alt="${name}"/></div>
        <div class="flip-back">${(name||'').toUpperCase()}</div>
      </div>`;
    return wrapper;
  }

  // Build set A and duplicate set B
  skills.forEach(s => track.appendChild(createSkillCard(s)));
  skills.forEach(s => track.appendChild(createSkillCard(s)));

  // Wait for ALL images inside the track to load
  const imgs = track.querySelectorAll('img');
  let loaded = 0;
  const total = imgs.length;

  if(total === 0){
    start(); // no images — start anyway
  } else {
    imgs.forEach(img=>{
      // in case cache already loaded
      if(img.complete) {
        loaded++;
        if(loaded === total) start();
      } else {
        img.addEventListener('load', ()=> {
          loaded++;
          if(loaded === total) start();
        }, {once:true});
        img.addEventListener('error', ()=> {
          // still count errors to avoid hang
          loaded++;
          if(loaded === total) start();
        }, {once:true});
      }
    });
  }

  // compute animation after images loaded
  function start(){
    // defensive: ensure one-row behavior
    track.style.flexWrap = 'nowrap';
    track.style.whiteSpace = 'nowrap';

    // compute width of one set
    const setWidth = track.scrollWidth / 2;
    // animation duration scaled by width (tweak divisor for speed)
    const duration = Math.max(12, Math.round(setWidth / 80));

    // create keyframes dynamically to avoid mismatch
    const name = 'scrollLoop';
    const css = `@keyframes ${name} {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }`;
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = css;
    document.head.appendChild(styleSheet);

    track.style.animation = `${name} ${duration}s linear infinite`;
  }
})();

/* -----------------------------
   PROJECT: small touch support (pause track on touch)
------------------------------*/
(function(){
  const track = document.getElementById('skillsTrack');
  if(!track) return;
  track.addEventListener('touchstart', ()=> track.style.animationPlayState = 'paused', {passive:true});
  track.addEventListener('touchend', ()=> track.style.animationPlayState = 'running', {passive:true});
})();

/* SIDEBAR TOGGLE */
const logoBtn = document.querySelector('.logo'); 
const sidebar = document.getElementById('sidebarMenu');
const overlay = document.getElementById('sidebarOverlay');
const closeBtn = document.getElementById('sidebarClose');

function openSidebar() {
  sidebar.classList.add('active');
  overlay.classList.add('active');
}

function closeSidebar() {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
}

logoBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);
