// AroVantage Main JS
document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initScrollAnimations();
  initMobileNav();
  initCounters();
  initCapabilityWheel();
  handleURLParams();
});

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNavbar, {passive: true});
  updateNavbar();
}

function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-up');
  if (!elements.length) return;
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.1, rootMargin: '0px 0px -50px 0px'});
  elements.forEach(function(el) { observer.observe(el); });
}

function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', function() {
    menu.classList.toggle('open');
    toggle.classList.toggle('active');
  });
  menu.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
      menu.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
}

function initCounters() {
  const numbers = document.querySelectorAll('.pedigree-number');
  if (!numbers.length) return;
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target')) || 0;
        if (target === 0) { el.textContent = '0'; return; }
        let start = 0;
        const duration = 1500;
        const step = (target / duration) * 16;
        function update() {
          start = Math.min(start + step, target);
          el.textContent = Math.floor(start);
          if (start < target) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, {threshold: 0.5});
  numbers.forEach(function(n) { observer.observe(n); });
}

function initCapabilityWheel() {
  const segments = document.querySelectorAll('.wheel-segment');
  const details = document.querySelectorAll('.capability-detail');
  if (!segments.length) return;
  segments[0] && segments[0].classList.add('active');
  segments.forEach(function(seg) {
    seg.addEventListener('click', function() {
      const service = seg.getAttribute('data-service');
      segments.forEach(function(s) { s.classList.remove('active'); });
      details.forEach(function(d) { d.classList.remove('active'); });
      seg.classList.add('active');
      const detail = document.querySelector('.capability-detail[data-service="' + service + '"]');
      if (detail) detail.classList.add('active');
    });
  });
}

function handleURLParams() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type');
  if (type === 'career') {
    const careerBtn = document.getElementById('btnCareer');
    if (careerBtn) careerBtn.click();
  }
  if (params.get('type') === 'client') {
    const clientBtn = document.getElementById('btnClient');
    if (clientBtn) clientBtn.click();
  }
}
