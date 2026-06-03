/* ============================================================
   NDUENGA AGRO INDUSTRIES — JAVASCRIPT PRINCIPAL
   ============================================================ */

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  backTop.style.display = window.scrollY > 500 ? 'flex' : 'none';
  highlightNavLink();
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

function toggleMenu() {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== ACTIVE NAV LINK =====
function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 180) current = sec.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

// ===== COUNTER ANIMATION =====
function animateCount(el, target, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target >= 1000
        ? target.toLocaleString('fr-FR')
        : target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) >= 1000
        ? Math.floor(start).toLocaleString('fr-FR')
        : Math.floor(start);
    }
  }, 16);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        animateCount(el, +el.dataset.count, 2200);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsBar = document.querySelector('.statsbar');
if (statsBar) counterObserver.observe(statsBar);

// ===== SCROLL REVEAL =====
const revealItems = document.querySelectorAll(
  '.prod-card, .srv-card, .comp-card, .res-card, .val-card, .loc-item, .partner-badge, .hero-card'
);

revealItems.forEach((el, i) => {
  el.style.cssText = `opacity:0; transform:translateY(22px); transition: opacity 0.55s ease ${(i % 4) * 70}ms, transform 0.55s ease ${(i % 4) * 70}ms;`;
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealItems.forEach(el => revealObserver.observe(el));

// ===== BACK TO TOP =====
const backTop = document.getElementById('backTop');
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== FORM SUBMIT =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.form-submit');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé avec succès !';
    btn.style.background = 'linear-gradient(135deg, #2E7D32, #388E3C)';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
      this.reset();
    }, 4000);
  });
}

// ===== SMOOTH ANCHOR CLICKS =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== YEAR IN FOOTER =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
