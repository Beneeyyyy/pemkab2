const MapEngine = {
    center: [-7.7326, 110.4017],
    zoom: 11,

    priorityColors: {
        low: "#3b82f6",
        medium: "#f59e0b",
        high: "#f97316",
        critical: "#ef4444"
    },

    priorityWeights: {
        low: 0.3,
        medium: 0.55,
        high: 0.8,
        critical: 1
    },

    data: [
        { id: "ISU001", title: "Jalan Rusak", loc: "Sinduharjo, Ngaglik", lat: -7.7089, lng: 110.4008, priority: "high" },
        { id: "ISU002", title: "Lampu Jalan Mati", loc: "Jl. Kaliurang, Ngaglik", lat: -7.6893, lng: 110.4088, priority: "critical" },
        { id: "ISU003", title: "Gangguan Air Bersih", loc: "Mlati", lat: -7.7432, lng: 110.3453, priority: "medium" },
        { id: "ISU004", title: "Banjir Berbah", loc: "Berbah", lat: -7.8081, lng: 110.4436, priority: "high" },
        { id: "ISU005", title: "Isu Cangkringan", loc: "Cangkringan", lat: -7.6263, lng: 110.4497, priority: "low" }
    ],

    districts: [
        { name: "Ngaglik", count: 2 }, { name: "Mlati", count: 1 }, { name: "Depok", count: 1 },
        { name: "Berbah", count: 1 }, { name: "Cangkringan", count: 0 }, { name: "Sleman", count: 0 },
        { name: "Kalasan", count: 0 }, { name: "Prambanan", count: 0 }
    ],

    markers: {},

    init() {
        this.initMap();
        this.renderAll();
        this.handleHeatmap();
    },

    initMap() {
        this.map = L.map('map-canvas', { zoomControl: false, scrollWheelZoom: true })
            .setView(this.center, this.zoom);

        L.control.zoom({ position: 'bottomleft' }).addTo(this.map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(this.map);

        this.dotLayer = L.layerGroup().addTo(this.map);
        this.heatLayer = L.heatLayer(
            this.data.map(p => [p.lat, p.lng, this.priorityWeights[p.priority]]),
            { radius: 45, blur: 30, maxZoom: 13, minOpacity: 0.35, gradient: { 0.2: '#3b82f6', 0.45: '#f59e0b', 0.7: '#f97316', 1: '#ef4444' } }
        );
    },

    renderAll() {
        // Heat dot per isu di atas peta
        this.data.forEach(p => {
            const color = this.priorityColors[p.priority];
            const weight = this.priorityWeights[p.priority];
            const size = 16 + weight * 14;

            const marker = L.marker([p.lat, p.lng], {
                icon: L.divIcon({
                    className: 'heat-dot-icon',
                    html: `<span class="heat-dot" style="--dot-color:${color}; --dot-size:${size}px;"></span>`,
                    iconSize: [size, size],
                    iconAnchor: [size / 2, size / 2]
                })
            }).bindPopup(`
                <div style="font-size:0.65rem; color:#94a3b8; font-weight:700;">${p.id}</div>
                <div style="font-weight:700; font-size:0.85rem;">${p.title}</div>
                <div style="font-size:0.75rem; color:#64748b;">${p.loc}</div>
                <span style="background:${color}22; color:${color}; font-size:0.6rem; padding:2px 8px; border-radius:4px; font-weight:700;">${p.priority.toUpperCase()}</span>
            `);

            marker.addTo(this.dotLayer);
            this.markers[p.id] = marker;
        });

        // Render Daftar Isu di Sidebar
        const sideList = document.getElementById('side-issue-render');
        sideList.innerHTML = this.data.map(p => {
            const color = this.priorityColors[p.priority];
            return `
            <div class="map-card" data-issue="${p.id}" style="border-left: 4px solid ${color}; margin-bottom:12px; padding:15px; background:white; border-radius:10px; border:1px solid #eee; cursor:pointer;">
                <div style="font-size:0.65rem; color:#94a3b8; font-weight:700;">${p.id}</div>
                <div style="font-weight:700; font-size:0.85rem;">${p.title}</div>
                <div style="font-size:0.75rem; color:#64748b; margin-bottom:8px;">${p.loc}</div>
                <span class="badge" style="background:${color}15; color:${color}; font-size:0.6rem; padding:2px 8px; border-radius:4px; font-weight:700;">${p.priority.toUpperCase()}</span>
            </div>
        `;
        }).join('');

        sideList.querySelectorAll('.map-card').forEach(card => {
            card.addEventListener('click', () => this.focusIssue(card.dataset.issue));
        });

        // Render Statistik Bawah
        const statGrid = document.getElementById('district-stat-grid');
        statGrid.innerHTML = this.districts.map(d => `
            <div class="stat-box">
                <div style="font-size:0.75rem; color:#64748b;">${d.name}</div>
                <div style="font-size:1.2rem; font-weight:700; color:#2563eb;">${d.count}</div>
            </div>
        `).join('');
    },

    focusIssue(id) {
        const issue = this.data.find(p => p.id === id);
        if (!issue) return;
        this.map.flyTo([issue.lat, issue.lng], 14, { duration: 0.8 });
        this.markers[id].openPopup();
    },

    handleHeatmap() {
        const toggle = document.getElementById('heatmap-toggle');
        toggle.addEventListener('change', () => {
            if (toggle.checked) {
                this.heatLayer.addTo(this.map);
            } else {
                this.map.removeLayer(this.heatLayer);
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => MapEngine.init());
