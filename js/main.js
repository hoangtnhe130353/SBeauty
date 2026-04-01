/* =====================================================
   PC1 GROUP — main.js
   Handles: AOS init, navbar, particles, counters,
            filter, form, back-to-top, progress bars
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initNavbar();
  initParticles();
  initCounters();
  initDocFilter();
  initBackToTop();
  initProgressBars();
  initNavHighlight();
  initMobileMenu();
});

/* ===================================================
   1. AOS — Animate on Scroll
   =================================================== */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic'
    });
  }
}

/* ===================================================
   2. Navbar — scroll detection
   =================================================== */
function initNavbar() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once
}

/* ===================================================
   3. Particle animation (hero background)
   =================================================== */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = ['#0a4fa8', '#00c4a1', '#1a63c6', '#00e5bb', '#3b82f6'];
  const count = window.innerWidth > 768 ? 22 : 10;

  for (let i = 0; i < count; i++) {
    createParticle(container, colors);
  }
}

function createParticle(container, colors) {
  const particle = document.createElement('div');
  particle.className = 'particle';

  const size = Math.random() * 6 + 3;
  const left = Math.random() * 100;
  const delay = Math.random() * 12;
  const duration = Math.random() * 12 + 10;
  const color = colors[Math.floor(Math.random() * colors.length)];

  particle.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${left}%;
    bottom: -20px;
    background: ${color};
    animation-delay: ${delay}s;
    animation-duration: ${duration}s;
    opacity: 0.25;
  `;

  container.appendChild(particle);
}

/* ===================================================
   4. Number Counters (count-up animation)
   =================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.count-num, .hero-kpi-num');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = true;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count || el.textContent.replace(/[^0-9]/g, ''), 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutExpo(progress);
    const current = Math.round(eased * target);

    el.textContent = formatNum(current) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = formatNum(target) + suffix;
    }
  };

  requestAnimationFrame(update);
}

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function formatNum(num) {
  if (num >= 1000) {
    return num.toLocaleString('vi-VN');
  }
  return num.toString();
}

/* ===================================================
   5. Document Filter
   =================================================== */
function initDocFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.doc-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ===================================================
   6. Back to Top button
   =================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===================================================
   7. Progress bars (Plan section)
   =================================================== */
function initProgressBars() {
  const bars = document.querySelectorAll('.target-bar');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width || 90;
        setTimeout(() => {
          bar.style.width = width + '%';
        }, 300);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
}

/* ===================================================
   8. Active nav link on scroll
   =================================================== */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ===================================================
   9. Mobile menu
   =================================================== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  // Close on nav link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
}

/* ===================================================
   10. Form submit handler
   =================================================== */
function handleFormSubmit() {
  const name = document.getElementById('f-name')?.value.trim();
  const email = document.getElementById('f-email')?.value.trim();
  const msg = document.getElementById('f-msg')?.value.trim();

  if (!name || !email) {
    showToast('⚠️ Vui lòng điền đầy đủ Họ tên và Email.', 'warn');
    return;
  }

  if (!isValidEmail(email)) {
    showToast('⚠️ Email không hợp lệ.', 'warn');
    return;
  }

  // Simulate sending
  showToast('✅ Yêu cầu đã được ghi nhận! Chúng tôi sẽ phản hồi sớm.', 'success');

  // Clear form
  setTimeout(() => {
    if (document.getElementById('f-name')) document.getElementById('f-name').value = '';
    if (document.getElementById('f-email')) document.getElementById('f-email').value = '';
    if (document.getElementById('f-msg')) document.getElementById('f-msg').value = '';
  }, 1000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ===================================================
   11. Toast notification
   =================================================== */
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.style.borderLeftColor = type === 'success' ? '#22c55e' : type === 'warn' ? '#f59e0b' : '#3b82f6';
  toast.style.borderLeft = `4px solid ${type === 'success' ? '#22c55e' : '#f59e0b'}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ===================================================
   12. Smooth scroll for anchor links
   =================================================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerH = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
