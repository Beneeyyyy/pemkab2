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
    inbox: "Pesan Masuk",
  };
  document.getElementById("page-title").innerText =
    titles[viewId] || "Command Center";

  // Chart Lazy Init
  if (viewId === "competitor" && !window.competitorChartInited) {
    initCompetitorChart();
    window.competitorChartInited = true;
  }
  
  // Initialize map for inbox view
  if (viewId === "inbox" && !window.inboxMapInited) {
    initInboxMap();
    window.inboxMapInited = true;
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

// Role-based Access Control
document.addEventListener("DOMContentLoaded", function () {
  // Check URL parameters for role
  const urlParams = new URLSearchParams(window.location.search);
  const role = urlParams.get('view');
  
  if (role === 'admin') {
    // Show admin navigation
    document.getElementById('admin-nav').style.display = 'block';
    document.getElementById('pic-nav').style.display = 'none';
  } else {
    // Show PIC navigation (non-admin)
    document.getElementById('admin-nav').style.display = 'none';
    document.getElementById('pic-nav').style.display = 'block';
    // Auto-switch to inbox view for non-admin
    switchView('inbox');
  }
});

function generateAIContent() {
  const problemSelect = document.getElementById('problem-select');
  const aiResult = document.getElementById('ai-result');
  const selectedProblem = problemSelect.value;
  
  aiResult.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Menghasilkan konten...';
  
  setTimeout(() => {
    const aiScripts = {
      'jalan-rusak': `🎬 VIDEO SCRIPT - JALAN RUSAK CONDONGCATUR

📍 Lokasi: Jalan Condongcatur, Sleman
📊 Status: Viral di TikTok (15K views)

🎥 Opening Shot:
- Drone shot menunjukkan kondisi jalan rusak
- Text overlay: "Warga Sleman, ini kondisi jalan kita!"

💬 Narasi:
"Selamat pagi warga Sleman. Kami menerima laporan viral tentang kondisi jalan di Condongcatur yang memprihatinkan. Pemerintah Kabupaten Sleman langsung respon cepat."

🔧 Action Plan:
1. Tim assessment sudah diturunkan hari ini
2. Perbaikan akan dimulai minggu depan
3. Estimasi selesai: 2 minggu

📞 Call to Action:
"Untuk laporan tambahan, hubungi command center kami di 0812-3456-7890"

#SlemanBerkembang #InfrastrukturSleman #PelayananPublik`,

      'sampah': `🎬 VIDEO SCRIPT - PENANGANAN SAMPAH

📍 Lokasi: Area Depok, Sleman
📊 Status: Keluhan warga meningkat

🎥 Opening Shot:
- Before/after comparison area sampah
- Text overlay: "Bersama kita jaga kebersihan Sleman!"

💬 Narasi:
"Terima kasih atas laporan warga terkait pengelolaan sampah di Depok. Ini komitmen kami..."

🔧 Action Plan:
1. Tambah 2 armada pengangkutan
2. Optimasi jadwal penjemputan
3. Edukasi pemilahan sampah

📞 Call to Action:
"Report sampah: 0812-3456-7890"

#SlemanBersih #LingkunganSehat #WargaPeduli`,

      'pelayanan': `🎬 VIDEO SCRIPT - PELAYANAN KESEHATAN

📍 Lokasi: Fasilitas kesehatan Tempel
📊 Status: Feedback waktu tunggu

🎥 Opening Shot:
- Interior fasilitas kesehatan
- Text overlay: "Pelayanan kesehatan terus kami tingkatkan!"

💬 Narasi:
"Pemerintah Kabupaten Sleman berkomitmen memberikan pelayanan kesehatan terbaik..."

🔧 Action Plan:
1. Tambah tenaga medis
2. Sistem antrian digital
3. Jam operasional tambahan

📞 Call to Action:
"Info kesehatan: 0812-3456-7890"

#SlemanSehat #PelayananPrima #KesehatanWarga`,

      'perizinan': `🎬 VIDEO SCRIPT - SIMPLIFIKASI PERIZINAN

📍 Lokasi: Kantor Pelayanan Ngemplak
📊 Status: Proses optimasi berjalan

🎥 Opening Shot:
- Animasi flow perizinan baru
- Text overlay: "Perizinan Sleman kini lebih mudah!"

💬 Narasi:
"Mendengar masukan warga, kami permudah proses perizinan di Sleman..."

🔧 Action Plan:
1. Sistem online 24/7
2. One-stop service
3. Waktu proses 50% lebih cepat

📞 Call to Action:
"Bantuan perizinan: 0812-3456-7890"

#SlemanMudah #InvestasiNyaman #PelayananDigital`
    };
    
    aiResult.innerHTML = aiScripts[selectedProblem] || 'Silakan pilih permasalahan terlebih dahulu.';
    
    aiResult.style.background = '#f0fdf4';
    setTimeout(() => {
      aiResult.style.background = '#f9f9f9';
    }, 1000);
    
  }, 1500);
}

function showMessageDetail(messageId) {
  document.querySelectorAll('.message-admin-note').forEach(note => {
    note.style.display = 'none';
  });
  
  document.querySelectorAll('.message-item').forEach(item => {
    item.classList.remove('active');
  });
  
  const noteElement = document.getElementById(messageId + '-note');
  if (noteElement) {
    noteElement.style.display = 'block';
  }
  
  event.currentTarget.classList.add('active');
  
  const locationMap = {
    'tiktok-1': { lat: -7.7616, lng: 110.3877, zoom: 15, name: "Condongcatur" },
    'tiktok-2': { lat: -7.7828, lng: 110.3789, zoom: 15, name: "Depok" },
    'tiktok-3': { lat: -7.7956, lng: 110.3695, zoom: 15, name: "Sleman Kota" },
    'twitter-1': { lat: -7.8156, lng: 110.3595, zoom: 15, name: "Tempel" },
    'twitter-2': { lat: -7.7456, lng: 110.3795, zoom: 15, name: "Ngemplak" },
    'twitter-3': { lat: -7.7556, lng: 110.3895, zoom: 15, name: "Gamping" }
  };
  
  const location = locationMap[messageId];
  if (location && window.inboxMap) {
    window.inboxMap.setView([location.lat, location.lng], location.zoom);
    
    // Hapus highlight circle yang lama jika ada
    if (window.currentHighlight) {
      window.inboxMap.removeLayer(window.currentHighlight);
      window.currentHighlight = null;
    }
    
    // Tidak ada highlight circle baru - hanya zoom ke lokasi
    // Heatmap dots yang sudah ada tidak terpengaruh
  }
}

function initInboxMap() {
  const mapContainer = document.getElementById('inbox-map');
  if (!mapContainer) return;
  
  const map = L.map('inbox-map').setView([-7.7956, 110.3695], 12);
  window.inboxMap = map;
  
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);
  
  // Heatmap points dengan style yang sama seperti dashboard utama
  const heatPoints = [
    { coords: [-7.7616, 110.3877], color: '#dc2626', radius: 1200, label: 'Condongcatur', desc: 'Video viral jalan rusak', id: 'tiktok-1' },
    { coords: [-7.7828, 110.3789], color: '#d97706', radius: 1000, label: 'Depok', desc: 'Keluhan sampah tidak diangkut', id: 'tiktok-2' },
    { coords: [-7.7956, 110.3695], color: '#059669', radius: 800, label: 'Sleman Kota', desc: 'Fasilitas parkir rusak', id: 'tiktok-3' },
    { coords: [-7.8156, 110.3595], color: '#dc2626', radius: 1200, label: 'Tempel', desc: 'Pelayanan lambat', id: 'twitter-1' },
    { coords: [-7.7456, 110.3795], color: '#d97706', radius: 1000, label: 'Ngemplak', desc: 'Proses perizinan rumit', id: 'twitter-2' },
    { coords: [-7.7556, 110.3895], color: '#059669', radius: 800, label: 'Gamping', desc: 'Jalan perlu perhatian', id: 'twitter-3' }
  ];
  
  heatPoints.forEach(point => {
    // Heatmap circle untuk visual effect
    L.circle(point.coords, {
      color: point.color,
      fillColor: point.color,
      fillOpacity: 0.5,
      radius: point.radius,
      stroke: false
    }).addTo(map)
    .bindPopup(`<b>${point.label}</b><br>${point.desc}<br><small>Klik pesan terkait untuk zoom ke lokasi ini</small>`);
  });
}
