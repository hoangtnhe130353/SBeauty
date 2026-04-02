document.addEventListener('DOMContentLoaded', () => {
  animateBarGroup('.seg-progress', 'data-w');
  animateBarGroup('.q-bar', 'data-w');

  if (typeof Chart === 'undefined') return;

  Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.boxWidth = 10;
  Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(15, 23, 42, 0.96)';
  Chart.defaults.plugins.tooltip.titleColor = '#fff';
  Chart.defaults.plugins.tooltip.bodyColor = 'rgba(255,255,255,0.82)';
  Chart.defaults.plugins.tooltip.padding = 12;
  Chart.defaults.plugins.tooltip.cornerRadius = 12;

  if (document.getElementById('historyChart')) initHistoryChart();
  if (document.getElementById('planVsActualChart')) initPlanVsActualChart();
  if (document.getElementById('segmentProfitChart')) initSegmentProfitChart();
  if (document.getElementById('quarterlyChart')) initQuarterlyChart();
  if (document.getElementById('roadmapChart')) initRoadmapChart();
});

function animateBarGroup(selector, attrName) {
  const bars = document.querySelectorAll(selector);
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const width = el.getAttribute(attrName) || el.dataset.w || '0';
      requestAnimationFrame(() => {
        el.style.width = width + '%';
      });
      observer.unobserve(el);
    });
  }, { threshold: 0.35 });

  bars.forEach((bar) => observer.observe(bar));
}

function initHistoryChart() {
  const ctx = document.getElementById('historyChart').getContext('2d');
  const labels = ['2020', '2021', '2022', '2023', '2024', '2025'];
  const data = [540, 760, 535, 303, 710, 1050];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: labels.map((year) => year === '2025' ? 'rgba(245,158,11,0.9)' : 'rgba(10,79,168,0.65)'),
        borderColor: labels.map((year) => year === '2025' ? 'rgba(245,158,11,1)' : 'rgba(10,79,168,1)'),
        borderRadius: 10,
        borderSkipped: false,
        borderWidth: 1.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `LNST: ${ctx.raw.toLocaleString('vi-VN')} ty dong`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: 'rgba(15,23,42,0.72)', font: { weight: '700' } }
        },
        y: {
          grid: { color: 'rgba(148,163,184,0.18)' },
          ticks: {
            color: 'rgba(15,23,42,0.5)',
            callback: (value) => value.toLocaleString('vi-VN')
          }
        }
      }
    }
  });
}

function initPlanVsActualChart() {
  const ctx = document.getElementById('planVsActualChart').getContext('2d');
  const planGradient = ctx.createLinearGradient(0, 0, 0, 320);
  planGradient.addColorStop(0, 'rgba(148,163,184,0.86)');
  planGradient.addColorStop(1, 'rgba(148,163,184,0.24)');

  const actualGoldGradient = ctx.createLinearGradient(0, 0, 0, 320);
  actualGoldGradient.addColorStop(0, 'rgba(245,158,11,0.95)');
  actualGoldGradient.addColorStop(1, 'rgba(245,158,11,0.36)');

  const actualBlueGradient = ctx.createLinearGradient(0, 0, 0, 320);
  actualBlueGradient.addColorStop(0, 'rgba(59,130,246,0.95)');
  actualBlueGradient.addColorStop(1, 'rgba(59,130,246,0.36)');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Doanh thu (ty dong)', 'LNST (ty dong)'],
      datasets: [
        {
          label: 'Ke hoach 2025',
          data: [14317, 837],
          backgroundColor: planGradient,
          borderColor: 'rgba(148,163,184,0.9)',
          borderRadius: 8,
          borderWidth: 1
        },
        {
          label: 'Thuc hien 2025',
          data: [14200, 1050],
          backgroundColor: [actualBlueGradient, actualGoldGradient],
          borderColor: ['rgba(59,130,246,1)', 'rgba(245,158,11,1)'],
          borderRadius: 8,
          borderWidth: 1.5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: 'rgba(255,255,255,0.72)' }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${ctx.raw.toLocaleString('vi-VN')} ty`
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: 'rgba(255,255,255,0.68)' }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: {
            color: 'rgba(255,255,255,0.56)',
            callback: (value) => value.toLocaleString('vi-VN')
          }
        }
      }
    }
  });
}

function initSegmentProfitChart() {
  const ctx = document.getElementById('segmentProfitChart').getContext('2d');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Xay lap dien', 'Nang luong', 'Khai khoang', 'KCN & san xuat', 'Bat dong san'],
      datasets: [{
        data: [42, 25, 18, 10, 5],
        backgroundColor: [
          'rgba(59,130,246,0.9)',
          'rgba(34,197,94,0.88)',
          'rgba(139,92,246,0.88)',
          'rgba(249,115,22,0.88)',
          'rgba(20,184,166,0.88)'
        ],
        borderColor: 'rgba(15,23,42,0.95)',
        borderWidth: 3,
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '62%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: 'rgba(255,255,255,0.72)',
            padding: 14
          }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ~${ctx.raw}% LNST`
          }
        }
      }
    }
  });
}

function initQuarterlyChart() {
  const ctx = document.getElementById('quarterlyChart').getContext('2d');
  const gradient2024 = ctx.createLinearGradient(0, 0, 0, 320);
  gradient2024.addColorStop(0, 'rgba(148,163,184,0.25)');
  gradient2024.addColorStop(1, 'rgba(148,163,184,0)');

  const gradient2025 = ctx.createLinearGradient(0, 0, 0, 320);
  gradient2025.addColorStop(0, 'rgba(245,158,11,0.28)');
  gradient2025.addColorStop(1, 'rgba(245,158,11,0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: '2024',
          data: [2150, 2360, 2990, 2589],
          borderColor: 'rgba(100,116,139,0.95)',
          backgroundColor: gradient2024,
          fill: true,
          tension: 0.35,
          pointRadius: 4
        },
        {
          label: '2025',
          data: [2200, 2500, 3000, 5012],
          borderColor: 'rgba(245,158,11,1)',
          backgroundColor: gradient2025,
          fill: true,
          tension: 0.35,
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: 'rgba(15,23,42,0.68)' }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${ctx.raw.toLocaleString('vi-VN')} ty dong`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: 'rgba(15,23,42,0.65)' }
        },
        y: {
          grid: { color: 'rgba(148,163,184,0.18)' },
          ticks: {
            color: 'rgba(15,23,42,0.52)',
            callback: (value) => value.toLocaleString('vi-VN')
          }
        }
      }
    }
  });
}

function initRoadmapChart() {
  const ctx = document.getElementById('roadmapChart').getContext('2d');
  const areaGradient = ctx.createLinearGradient(0, 0, 0, 320);
  areaGradient.addColorStop(0, 'rgba(245,158,11,0.32)');
  areaGradient.addColorStop(1, 'rgba(245,158,11,0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026F', '2027F', '2028F'],
      datasets: [{
        label: 'LNST (ty dong)',
        data: [540, 760, 535, 303, 710, 1050, 1250, 1500, 1800],
        borderColor: 'rgba(245,158,11,1)',
        backgroundColor: areaGradient,
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointBackgroundColor: 'rgba(245,158,11,1)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: 'rgba(255,255,255,0.72)' }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.raw.toLocaleString('vi-VN')} ty dong`
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: 'rgba(255,255,255,0.66)' }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: {
            color: 'rgba(255,255,255,0.56)',
            callback: (value) => value.toLocaleString('vi-VN')
          }
        }
      }
    }
  });
}
