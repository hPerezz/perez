// ==================== Scroll Progress Bar ====================
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
  progressBar.style.transform = `scaleX(${scrollPercent})`;
});

// ==================== Sticky CTA ====================
const stickyCta = document.getElementById('sticky-cta');

window.addEventListener('scroll', () => {
  if (window.scrollY > window.innerHeight * 0.8) {
    stickyCta.classList.add('visible');
  } else {
    stickyCta.classList.remove('visible');
  }
});

// ==================== Scroll to Contact ====================
function scrollToContact() {
  const el = document.getElementById('contact');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ==================== Scroll Reveal (IntersectionObserver) ====================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0.25;
      entry.target.style.transitionDelay = delay + 's';
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ==================== Aftermovie Video – autoplay when in view ====================
const aftermovieVideo = document.getElementById('aftermovie-video');
const aftermovieOverlay = document.getElementById('aftermovie-overlay');
const aftermoviePlayBtn = document.getElementById('aftermovie-play-btn');
const aftermovieSection = document.getElementById('aftermovie');
let isPlaying = false;

function showOverlay() {
  if (!aftermovieOverlay) return;
  aftermovieOverlay.classList.remove('opacity-0', 'pointer-events-none');
  aftermovieOverlay.classList.add('opacity-100');
  aftermovieOverlay.classList.add('hover:opacity-100');
}

function hideOverlay() {
  if (!aftermovieOverlay) return;
  aftermovieOverlay.classList.remove('opacity-100');
  aftermovieOverlay.classList.add('opacity-0', 'pointer-events-none');
  aftermovieOverlay.classList.add('hover:opacity-100');
}

function playVideo() {
  if (!aftermovieVideo) return;
  const p = aftermovieVideo.play();
  if (p && typeof p.then === 'function') {
    p.then(() => {
      hideOverlay();
      isPlaying = true;
    }).catch(() => {
      aftermovieVideo.load();
      aftermovieVideo.addEventListener('canplay', () => {
        aftermovieVideo.play().then(() => {
          hideOverlay();
          isPlaying = true;
        }).catch(() => {});
      }, { once: true });
    });
  } else {
    hideOverlay();
    isPlaying = true;
  }
}

function pauseVideo() {
  if (!aftermovieVideo) return;
  aftermovieVideo.pause();
  showOverlay();
  isPlaying = false;
}

if (aftermovieSection && aftermovieVideo) {
  const aftermovieObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playVideo();
        } else {
          pauseVideo();
        }
      });
    },
    { threshold: 0.25 }
  );
  aftermovieObserver.observe(aftermovieSection);
}

if (aftermoviePlayBtn && aftermovieVideo) {
  aftermoviePlayBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  });
}

if (aftermovieVideo && aftermovieOverlay) {
  aftermovieVideo.addEventListener('click', () => {
    if (isPlaying) {
      pauseVideo();
    }
  });
}

// ==================== Performance section – play on click ====================
document.querySelectorAll('.perf-card').forEach((card) => {
  const video = card.querySelector('.perf-video');
  const overlay = card.querySelector('.perf-overlay');
  const playBtn = card.querySelector('.perf-play');
  if (!video || !overlay || !playBtn) return;

  function showOverlay() {
    overlay.classList.remove('opacity-0', 'pointer-events-none');
  }
  function hideOverlay() {
    overlay.classList.add('opacity-0', 'pointer-events-none');
  }

  playBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (video.paused) {
      video.play().then(() => hideOverlay()).catch(() => {});
    } else {
      video.pause();
      showOverlay();
    }
  });

  card.addEventListener('click', (e) => {
    if (!video.paused && !playBtn.contains(e.target)) {
      video.pause();
      showOverlay();
    }
  });

  video.addEventListener('pause', showOverlay);
  video.addEventListener('play', hideOverlay);
});

// ==================== Gallery Lightbox ====================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(imageUrl) {
  lightboxImg.src = imageUrl;
  lightbox.classList.add('active');
}

function closeLightbox() {
  lightbox.classList.remove('active');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ==================== Progressive Hero Image Loading ====================
const heroSmall = document.getElementById('hero-small');
const heroFull = document.getElementById('hero-full');

if (heroFull) {
  heroFull.addEventListener('load', () => {
    heroFull.classList.add('loaded');
    if (heroSmall) {
      setTimeout(() => {
        heroSmall.classList.add('fade-out');
      }, 300);
    }
  });
  
  // Preload the full image
  heroFull.src = heroFull.src;
}
