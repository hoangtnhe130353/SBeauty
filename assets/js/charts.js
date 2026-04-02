/* =====================================================
   PC1 GROUP — charts.js
   Chart.js visualizations:
   1. Revenue & Profit bar chart (2022–2024)
   2. Segment donut chart (revenue breakdown 2024)
   3. Growth line chart (2022–2026F)
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Global Chart.js defaults
  setupChartDefaults();

  // Init charts when elements exist
  if (document.getElementById('revenueChart')) initRevenueChart();
  if (document.getElementById('segmentChart')) initSegmentChart();
  if (document.getElementById('growthChart')) initGrowthChart();
});

/* ===================================================
   Global defaults
   =================================================== */
function setupChartDefaults() {
  if (typeof Chart === 'undefined') return;

  Chart.defaults.font.family = "'Inter', -apple-system, sans-serif";
  Chart.defaults.color = 'rgba(255,255,255,0.65)';
  Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(13,27,42,0.95)';
  Chart.defaults.plugins.tooltip.titleColor = '#fff';
  Chart.defaults.plugins.tooltip.bodyColor = 'rgba(255,255,255,0.8)';
  Chart.defaults.plugins.tooltip.padding = 12;
  Chart.defaults.plugins.tooltip.cornerRadius = 10;
  Chart.defaults.plugins.tooltip.borderColor = 'rgba(255,255,255,0.12)';
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.legend.labels.boxWidth = 14;
  Chart.defaults.plugins.legend.labels.padding = 16;
  Chart.defaults.plugins.legend.labels.borderRadius = 4;
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
}

/* ===================================================
   1. Revenue & Profit bar chart (2022–2024)
   Data: Tỷ đồng
   - 2022: Revenue 5.580 / PAT ~150
   - 2023: Revenue 7.775 / PAT 303
   - 2024: Revenue 10.089 / PAT 710
   =================================================== */
function initRevenueChart() {
  const ctx = document.getElementById('revenueChart').getContext('2d');

  const labels = ['2022', '2023', '2024'];
  const revenueData = [5580, 7775, 10089];
  const profitData = [150, 303, 710];

  // Gradient for revenue bars
  const gradRevenue = ctx.createLinearGradient(0, 0, 0, 300);
  gradRevenue.addColorStop(0, 'rgba(26,99,198,0.95)');
  gradRevenue.addColorStop(1, 'rgba(10,79,168,0.7)');

  const gradProfit = ctx.createLinearGradient(0, 0, 0, 300);
  gradProfit.addColorStop(0, 'rgba(0,196,161,0.95)');
  gradProfit.addColorStop(1, 'rgba(0,196,161,0.6)');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Doanh thu (tỷ đồng)',
          data: revenueData,
          backgroundColor: gradRevenue,
          borderColor: 'rgba(26,99,198,1)',
          borderWidth: 1,
          borderRadius: 8,
          borderSkipped: false,
          yAxisID: 'y'
        },
        {
          label: 'LNST (tỷ đồng)',
          data: profitData,
          backgroundColor: gradProfit,
          borderColor: 'rgba(0,196,161,1)',
          borderWidth: 1,
          borderRadius: 8,
          borderSkipped: false,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'top',
          labels: { color: 'rgba(255,255,255,0.7)', font: { size: 12 } }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw.toLocaleString('vi-VN')} tỷ`
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: 'rgba(255,255,255,0.6)', font: { weight: '600' } }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          grid: { color: 'rgba(255,255,255,0.06)' },
          ticks: {
            color: 'rgba(255,255,255,0.5)',
            callback: (v) => v.toLocaleString('vi-VN')
          },
          title: { display: true, text: 'Doanh thu (tỷ đồng)', color: 'rgba(255,255,255,0.4)', font: { size: 11 } }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: {
            color: 'rgba(0,196,161,0.7)',
            callback: (v) => v.toLocaleString('vi-VN')
          },
          title: { display: true, text: 'LNST (tỷ đồng)', color: 'rgba(0,196,161,0.5)', font: { size: 11 } }
        }
      }
    }
  });
}

/* ===================================================
   2. Revenue by segment – donut chart 2024
   Estimated breakdown (illustrative):
   - Xây lắp điện:   ~48%
   - Năng lượng:     ~22%
   - Khu công nghiệp:~10%
   - Sản xuất CN:    ~10%
   - Khoáng sản:     ~6%
   - BĐS dân dụng:   ~4%
   =================================================== */
function initSegmentChart() {
  const ctx = document.getElementById('segmentChart').getContext('2d');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [
        'Xây lắp điện',
        'Đầu tư năng lượng',
        'Khu công nghiệp',
        'Sản xuất công nghiệp',
        'Khoáng sản',
        'Bất động sản'
      ],
      datasets: [{
        data: [48, 22, 10, 10, 6, 4],
        backgroundColor: [
          'rgba(10,79,168,0.85)',
          'rgba(0,196,161,0.85)',
          'rgba(3,105,161,0.85)',
          'rgba(234,88,12,0.85)',
          'rgba(124,58,237,0.85)',
          'rgba(13,148,136,0.85)'
        ],
        borderColor: [
          'rgba(10,79,168,1)',
          'rgba(0,196,161,1)',
          'rgba(3,105,161,1)',
          'rgba(234,88,12,1)',
          'rgba(124,58,237,1)',
          'rgba(13,148,136,1)'
        ],
        borderWidth: 2,
        hoverOffset: 12
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
            color: 'rgba(255,255,255,0.7)',
            font: { size: 11 },
            padding: 12,
            generateLabels: (chart) => {
              const data = chart.data;
              return data.labels.map((label, i) => ({
                text: `${label} (${data.datasets[0].data[i]}%)`,
                fillStyle: data.datasets[0].backgroundColor[i],
                strokeStyle: data.datasets[0].borderColor[i],
                lineWidth: 1,
                pointStyle: 'circle',
                hidden: false,
                index: i
              }));
            }
          }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${ctx.raw}% doanh thu`
          }
        }
      }
    }
  });
}

/* ===================================================
   3. Revenue growth line chart (2022–2026F)
   =================================================== */
function initGrowthChart() {
  const ctx = document.getElementById('growthChart').getContext('2d');

  const years = ['2022', '2023', '2024', '2025F', '2026F'];
  const revenueData = [5580, 7775, 10089, 12800, 15500];
  const profitData = [150, 303, 710, 900, 1200];

  // Area gradient for revenue
  const gradArea = ctx.createLinearGradient(0, 0, 0, 280);
  gradArea.addColorStop(0, 'rgba(10,79,168,0.3)');
  gradArea.addColorStop(1, 'rgba(10,79,168,0)');

  const gradArea2 = ctx.createLinearGradient(0, 0, 0, 280);
  gradArea2.addColorStop(0, 'rgba(0,196,161,0.3)');
  gradArea2.addColorStop(1, 'rgba(0,196,161,0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Doanh thu (tỷ đồng)',
          data: revenueData,
          borderColor: 'rgba(26,99,198,1)',
          backgroundColor: gradArea,
          borderWidth: 3,
          pointBackgroundColor: 'rgba(26,99,198,1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 9,
          fill: true,
          tension: 0.4,
          yAxisID: 'y'
        },
        {
          label: 'LNST (tỷ đồng)',
          data: profitData,
          borderColor: 'rgba(0,196,161,1)',
          backgroundColor: gradArea2,
          borderWidth: 3,
          pointBackgroundColor: 'rgba(0,196,161,1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 9,
          fill: true,
          tension: 0.4,
          yAxisID: 'y1',
          borderDash: [0, 0]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'top',
          labels: { color: 'rgba(10,79,168,0.85)', font: { size: 12, weight: '600' } }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw.toLocaleString('vi-VN')} tỷ`,
            afterBody: (items) => {
              const year = items[0]?.label;
              if (year && year.includes('F')) return ['* Dự phóng'];
              return [];
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(10,79,168,0.08)' },
          ticks: { color: 'rgba(30,41,59,0.7)', font: { weight: '600', size: 12 } }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          grid: { color: 'rgba(10,79,168,0.08)' },
          ticks: {
            color: 'rgba(10,79,168,0.7)',
            callback: (v) => v.toLocaleString('vi-VN')
          },
          title: { display: true, text: 'Doanh thu (tỷ)', color: 'rgba(10,79,168,0.5)', font: { size: 11 } }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: {
            color: 'rgba(0,196,161,0.8)',
            callback: (v) => v.toLocaleString('vi-VN')
          },
          title: { display: true, text: 'LNST (tỷ)', color: 'rgba(0,196,161,0.5)', font: { size: 11 } }
        }
      }
    }
  });
}
