const MapEngine = {
    // Data koordinat yang sudah diuji sesuai visual desain
    data: [
        { id: "ISU001", title: "Jalan Rusak", loc: "Sinduharjo, Ngaglik", top: "35%", left: "48%", color: "#f97316", priority: "high" },
        { id: "ISU002", title: "Lampu Jalan Mati", loc: "Jl. Kaliurang, Ngaglik", top: "42%", left: "44%", color: "#ef4444", priority: "critical" },
        { id: "ISU003", title: "Gangguan Air Bersih", loc: "Mlati", top: "62%", left: "20%", color: "#f59e0b", priority: "medium" },
        { id: "ISU004", title: "Banjir Berbah", loc: "Berbah", top: "82%", left: "58%", color: "#f97316", priority: "high" },
        { id: "ISU005", title: "Isu Cangkringan", loc: "Cangkringan", top: "18%", left: "55%", color: "#3b82f6", priority: "low" }
    ],

    districts: [
        { name: "Ngaglik", count: 2 }, { name: "Mlati", count: 1 }, { name: "Depok", count: 1 },
        { name: "Berbah", count: 1 }, { name: "Cangkringan", count: 0 }, { name: "Sleman", count: 0 },
        { name: "Kalasan", count: 0 }, { name: "Prambanan", count: 0 }
    ],

    init() {
        this.renderAll();
        this.handleHeatmap();
    },

    renderAll() {
        // Render Marker ke Peta
        const markerLayer = document.getElementById('marker-layer');
        markerLayer.innerHTML = this.data.map(p => `
            <div class="marker" style="top:${p.top}; left:${p.left}; border-color:${p.color}; color:${p.color}">
                <i class="fa-solid fa-location-dot"></i>
            </div>
        `).join('');

        // Render Daftar Isu di Sidebar
        const sideList = document.getElementById('side-issue-render');
        sideList.innerHTML = this.data.map(p => `
            <div class="map-card" style="border-left: 4px solid ${p.color}; margin-bottom:12px; padding:15px; background:white; border-radius:10px; border:1px solid #eee;">
                <div style="font-size:0.65rem; color:#94a3b8; font-weight:700;">${p.id}</div>
                <div style="font-weight:700; font-size:0.85rem;">${p.title}</div>
                <div style="font-size:0.75rem; color:#64748b; margin-bottom:8px;">${p.loc}</div>
                <span class="badge" style="background:${p.color}15; color:${p.color}; font-size:0.6rem; padding:2px 8px; border-radius:4px; font-weight:700;">${p.priority.toUpperCase()}</span>
            </div>
        `).join('');

        // Render Statistik Bawah
        const statGrid = document.getElementById('district-stat-grid');
        statGrid.innerHTML = this.districts.map(d => `
            <div class="stat-box">
                <div style="font-size:0.75rem; color:#64748b;">${d.name}</div>
                <div style="font-size:1.2rem; font-weight:700; color:#2563eb;">${d.count}</div>
            </div>
        `).join('');
    },

    handleHeatmap() {
        const toggle = document.getElementById('heatmap-toggle');
        const mapContainer = document.querySelector('.map-view-container');
        toggle.addEventListener('change', () => {
            mapContainer.classList.toggle('heatmap-active', toggle.checked);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => MapEngine.init());