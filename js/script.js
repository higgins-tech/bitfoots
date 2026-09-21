/* =========================================================
   BITFOOTS — vanilla JS
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  buildFireflies();
  buildCarousel();
  buildHeadsGrid();
  bindFaq();
  bindMusicPlayer();
  bindScrollCue();
});

/* ---------------------------------------------------------
   Ambient fireflies scattered across the whole page
   --------------------------------------------------------- */
function buildFireflies(){
  const host = document.getElementById('fireflies');
  if(!host) return;
  const total = window.innerWidth < 700 ? 16 : 30;

  for(let i = 0; i < total; i++){
    const f = document.createElement('span');
    f.className = 'firefly';
    f.style.left = rand(2, 96) + 'vw';
    f.style.top = rand(4, 98) + 'vh';
    f.style.animationDelay = rand(0, 4).toFixed(2) + 's';
    f.style.animationDuration = rand(3, 6).toFixed(2) + 's';
    f.innerHTML = '<i></i><i></i>';
    host.appendChild(f);
  }
}

/* ---------------------------------------------------------
   Collection carousel
   --------------------------------------------------------- */
function buildCarousel(){
  const track = document.getElementById('carouselTrack');
  const dotsHost = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  if(!track) return;

  const SLIDE_COUNT = 17; // img/img1.png … img/img17.png
  let current = 0;

  for(let i = 1; i <= SLIDE_COUNT; i++){
    const slide = document.createElement('div');
    slide.className = 'carousel__slide';

    const img = document.createElement('img');
    img.src = `img/img${i}.png`;
    img.alt = `BitFoots collection artwork ${i}`;
    img.loading = 'lazy';
    slide.appendChild(img);

    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to artwork ' + i);
    dot.addEventListener('click', () => goTo(i - 1));
    dotsHost.appendChild(dot);
  }

  const dots = Array.from(dotsHost.children);

  function goTo(index){
    current = (index + SLIDE_COUNT) % SLIDE_COUNT;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  goTo(0);
}

/* ---------------------------------------------------------
   The Heads grid (18 placeholder tiles)
   --------------------------------------------------------- */
function buildHeadsGrid(){
  const grid = document.getElementById('headsGrid');
  if(!grid) return;
  const TOTAL = 18; // img/bitfoot-head-01.png … img/bitfoot-head-18.png

  for(let i = 1; i <= TOTAL; i++){
    const label = String(i).padStart(2, '0');

    const card = document.createElement('div');
    card.className = 'head-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'Head ' + label);

    const img = document.createElement('img');
    img.src = `img/bitfoot-head-${label}.png`;
    img.alt = `BitFoot head ${label}`;
    img.loading = 'lazy';
    card.appendChild(img);

    grid.appendChild(card);
  }
}

/* ---------------------------------------------------------
   FAQ accordion
   --------------------------------------------------------- */
function bindFaq(){
  const items = document.querySelectorAll('.faq__item');
  items.forEach(item => {
    const btn = item.querySelector('.faq__question');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      items.forEach(i => { i.classList.remove('is-open'); i.querySelector('.faq__question').setAttribute('aria-expanded', 'false'); });
      if(!isOpen){
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ---------------------------------------------------------
   Music player
   --------------------------------------------------------- */
function bindMusicPlayer(){
  const toggle = document.getElementById('musicToggle');
  const icon = document.getElementById('musicIcon');
  const slider = document.getElementById('volSlider');
  const tooltip = document.getElementById('volTooltip');
  const audio = document.getElementById('bgAudio');
  if(!slider) return;

  let muted = false;

  function updateTooltip(){
    tooltip.textContent = slider.value + '%';
    const pct = slider.value / 100;
    tooltip.style.left = pct * 100 + '%';
  }

  slider.addEventListener('input', () => {
    updateTooltip();
    if(audio) audio.volume = slider.value / 100;
    icon.className = slider.value == 0 ? 'ri-volume-mute-line' : 'ri-volume-up-line';
  });

  toggle.addEventListener('click', () => {
    muted = !muted;
    if(muted){
      icon.className = 'ri-volume-mute-line';
      if(audio) audio.pause();
    } else {
      icon.className = slider.value == 0 ? 'ri-volume-mute-line' : 'ri-volume-up-line';
      if(audio && slider.value > 0) audio.play().catch(() => {});
    }
  });

  updateTooltip();
}

/* ---------------------------------------------------------
   Scroll cue
   --------------------------------------------------------- */
function bindScrollCue(){
  const cue = document.getElementById('scrollCue');
  if(!cue) return;
  cue.addEventListener('click', () => {
    document.getElementById('prologue').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------
   Utils
   --------------------------------------------------------- */
function rand(min, max){
  return Math.random() * (max - min) + min;
}
