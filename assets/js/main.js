/* =====================================================
   PC1 GROUP â€” main.js
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
  initSiteData();
});

let reportDataPromise;

async function initSiteData() {
  const data = await loadReportData();
  if (!data) return;

  renderYearSwitchers(data.yearNavigation || []);
  renderReportYearLinks(data.yearNavigation || []);
  renderContactDetails(data.contact || {});
  renderYearSummaries(data.reports || {});
}

async function loadReportData() {
  if (!reportDataPromise) {
    reportDataPromise = fetch(resolveSitePath('assets/data/report-data.json'), { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load report data: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.warn(error);
        return null;
      });
  }

  return reportDataPromise;
}

function resolveSitePath(relativePath) {
  if (window.location.pathname.includes('/pages/')) {
    return `../${relativePath}`;
  }

  return relativePath;
}

function renderYearSwitchers(years) {
  document.querySelectorAll('[data-year-switcher]').forEach((container) => {
    const currentYear = container.dataset.currentYear;
    const currentItem = years.find((item) => item.year === currentYear) || years[0];
    const menuItems = years.map((item) => {
      const classes = ['year-selector-link'];
      if (item.year === currentYear) classes.push('is-active');
      if (item.placeholder) classes.push('is-placeholder');

      return `<a href="${item.href}" class="${classes.join(' ')}"${item.year === currentYear ? ' aria-current="page"' : ''}>
        <span>${item.label}</span>
        ${item.placeholder ? '<small>Sáº¯p cÃ³</small>' : ''}
      </a>`;
    }).join('');

    container.innerHTML = `
      <details class="year-selector">
        <summary class="year-selector-trigger">
          <span class="year-selector-caption">NÄƒm bÃ¡o cÃ¡o</span>
          <strong>${currentItem ? currentItem.label : currentYear}</strong>
          <i class="fas fa-chevron-down" aria-hidden="true"></i>
        </summary>
        <div class="year-selector-menu">
          ${menuItems}
        </div>
      </details>
    `;
  });
}

function renderReportYearLinks(years) {
  document.querySelectorAll('[data-report-year-links]').forEach((container) => {
    const currentYear = container.dataset.currentYear;
    container.innerHTML = years.map((item) => {
      const linkClass = item.year === currentYear ? ' class="active-link"' : '';
      const suffix = item.placeholder ? ' (khung sáºµn)' : '';
      return `<li><a href="${item.href}"${linkClass}>BÃ¡o cÃ¡o ${item.year}${suffix}</a></li>`;
    }).join('');
  });
}

function renderContactDetails(contact) {
  document.querySelectorAll('[data-contact]').forEach((node) => {
    const key = node.dataset.contact;
    if (!contact[key]) return;
    node.textContent = contact[key];
  });
}

function renderYearSummaries(reports) {
  document.querySelectorAll('[data-year-summary]').forEach((container) => {
    const year = container.dataset.yearSummary;
    const report = reports[year];
    if (!report) return;

    const statusClass = report.status === 'planning' ? 'planning' : 'pending';
    const cards = (report.summaryCards || []).map((item) => {
      return `<div class="year-summary-card"><strong>${item.value}</strong><span>${item.label}</span></div>`;
    }).join('');

    container.innerHTML = `
      <div class="year-placeholder-top">
        <div class="section-tag light">NÄƒm ${report.year}</div>
        <span class="year-status ${statusClass}">${report.statusLabel || report.status}</span>
      </div>
      <h2>${report.title}</h2>
      <p>${report.subtitle || ''}</p>
      <div class="year-summary-grid">${cards}</div>
      <div class="year-placeholder-note">${report.note || ''}</div>
    `;
  });
}

/* ===================================================
   1. AOS â€” Animate on Scroll
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
   2. Navbar â€” scroll detection
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
    showToast('âš ï¸ Vui lÃ²ng Ä‘iá»n Ä‘áº§y Ä‘á»§ Há» tÃªn vÃ  Email.', 'warn');
    return;
  }

  if (!isValidEmail(email)) {
    showToast('âš ï¸ Email khÃ´ng há»£p lá»‡.', 'warn');
    return;
  }

  // Simulate sending
  showToast('âœ… YÃªu cáº§u Ä‘Ã£ Ä‘Æ°á»£c ghi nháº­n! ChÃºng tÃ´i sáº½ pháº£n há»“i sá»›m.', 'success');

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

