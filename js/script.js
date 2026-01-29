// Navigation
function switchView(viewId) {
  // Nav Active State
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
    const onclick = item.getAttribute("onclick");
    if (onclick && onclick.includes(viewId)) item.classList.add("active");
  });

  // Content Visibility
  document
    .querySelectorAll(".view-section")
    .forEach((sec) => sec.classList.remove("active"));
  const target = document.getElementById(viewId);
  if (target) target.classList.add("active");

  // Header Title
  const titles = {
    dashboard: "Situation Room",
    competitor: "Competitor Intelligence",
    warning: "Early Warning System",
    troops: "Troops Command Center",
    optimizer: "AI Content Optimizer",
    accounts: "KOL & Influencer Management",
    reports: "Executive Reports",
  };
  document.getElementById("page-title").innerText =
    titles[viewId] || "Command Center";

  // Chart Lazy Init
  if (viewId === "competitor" && !window.competitorChartInited) {
    initCompetitorChart();
    window.competitorChartInited = true;
  }
}

// Chart.js Init
document.addEventListener("DOMContentLoaded", function () {
  // Dates
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  document.getElementById("current-date").innerText =
    new Date().toLocaleDateString("id-ID", options);

  initMap(); // Initialize Map

  // Main Chart
  const ctx = document.getElementById("mainChart").getContext("2d");
  const gradientPos = ctx.createLinearGradient(0, 0, 0, 400);
  gradientPos.addColorStop(0, "rgba(16, 185, 129, 0.5)");
  gradientPos.addColorStop(1, "rgba(16, 185, 129, 0.0)");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
      datasets: [
        {
          label: "Positif",
          data: [12, 15, 30, 50, 55, 65],
          borderColor: "#10B981",
          backgroundColor: gradientPos,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
        {
          label: "Negatif",
          data: [8, 10, 15, 20, 30, 15],
          borderColor: "#EF4444",
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "top" } },
      scales: { x: { grid: { display: false } } },
    },
  });

  // Live Stream Sim
  const streamContainer = document.getElementById("streamList");
    const comments = [
        { text: "Pelayanan makin cepat! #SlemanSembada", sentiment: "positive", user: "@warga_sleman" },
        { text: "Antrian puskesmas panjang", sentiment: "negative", user: "@budi_santoso" },
        { text: "Jalan kaliurang sudah mulus", sentiment: "positive", user: "@jogja_update" }
    ];

  setInterval(() => {
    const c = comments[Math.floor(Math.random() * comments.length)];
    const el = document.createElement("div");
    el.className = `stream-item ${c.sentiment}`;
    el.innerHTML = `<div class="stream-header"><span>${c.user}</span><span>Just now</span></div><div class="stream-content">${c.text}</div>`;
    streamContainer.prepend(el);
    if (streamContainer.children.length > 8)
      streamContainer.lastElementChild.remove();
  }, 3000);
});

// Competitor Chart
// Competitor Chart
function initCompetitorChart() {
  const ctx = document.getElementById("competitorChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Pemkab Sleman",
          data: [75, 78, 80, 82, 85],
          backgroundColor: "#2563EB", // Primary Blue
          borderRadius: 4,
        },
        {
          label: "Kab. Bantul",
          data: [70, 72, 71, 74, 76],
          backgroundColor: "#94A3B8", // Muted
          borderRadius: 4,
        },
        {
          label: "Kab. Gunungkidul",
          data: [65, 68, 66, 69, 70],
          backgroundColor: "#CBD5E1", // Light Muted
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top" },
        tooltip: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y + "% (Indeks Kepuasan)";
              }
              return label;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
        },
        y: {
          beginAtZero: true,
          max: 100,
          grid: { borderDash: [5, 5] },
          ticks: {
            callback: function (value) {
              return value + "%";
            },
          },
        },
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
    },
  });
}

// Interactions
document.getElementById("btnGenerate").addEventListener("click", function () {
  const btn = this;
  const loader = btn.querySelector(".loader");
  btn.disabled = true;
  loader.style.display = "block";

  setTimeout(() => {
    btn.disabled = false;
    loader.style.display = "none";
    document.getElementById("outputPlaceholder").style.display = "none";
    document.getElementById("aiOutput").style.display = "block";
  }, 2000);
});

function generateReport(type) {
  if (confirm(`Generate and download ${type} Report?`)) {
    alert("Generating report... Download will start automatically.");
  }
}

// Heatmap Initialization
function initMap() {
    // Coordinates for Sleman Regency
    const slemanCoords = [-7.712, 110.355];
    const map = L.map('map', {
        zoomControl: false // Cleaner look
    }).setView(slemanCoords, 11);

    // Using CartoDB Positron for a clean, professional look that fits the theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Add zoomed control to top right
    L.control.zoom({
        position: 'topright'
    }).addTo(map);

    // Simulate "Heatmap" data points (Clusters)
    const heatPoints = [
        { coords: [-7.76, 110.37], color: '#EF4444', radius: 1500, label: 'High Alert: RSUD' }, // Red (Bad)
        { coords: [-7.70, 110.40], color: '#F59E0B', radius: 1200, label: 'Warning: Traffic' }, // Orange (Warning)
        { coords: [-7.68, 110.34], color: '#10B981', radius: 1000, label: 'Safe: Kaliurang' }, // Green (Good)
        { coords: [-7.75, 110.28], color: '#3B82F6', radius: 800,  label: 'Info: New Project' }  // Blue (Info)
    ];

    heatPoints.forEach(point => {
        L.circle(point.coords, {
            color: point.color,
            fillColor: point.color,
            fillOpacity: 0.5,
            radius: point.radius,
            stroke: false
        }).addTo(map)
        .bindPopup(`<b>${point.label}</b><br>Radius: ${point.radius}m`);
    });
}

// Ensure map is resized when tab switches to dashboard (if it was hidden)
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.id === 'dashboard' && mutation.target.classList.contains('active')) {
            setTimeout(() => {
                const mapContainer = document.getElementById('map');
                if (mapContainer) {
                   window.dispatchEvent(new Event('resize')); 
                }
            }, 100);
        }
    });
});
observer.observe(document.getElementById('dashboard'), { attributes: true, attributeFilter: ['class'] });
