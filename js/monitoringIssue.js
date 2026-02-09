const IssueModule = {
    allIssues: [
        {
            id: "ISU001",
            title: "Jalan Rusak di Desa Sinduharjo",
            desc: "Jalan utama desa mengalami kerusakan parah dengan banyak lubang",
            loc: "Sinduharjo, Ngaglik",
            date: "8 Feb",
            eng: "2,450 engagement",
            posts: "12 posts",
            category: "Infrastruktur Jalan",
            assigned: "Dinas PUPR",
            priority: "HIGH",
            status: "On Progress",
            timeline: "Created 8/2/2026 → Updated 9/2/2026"
        },
        {
            id: "ISU002",
            title: "Lampu Jalan Mati Jl. Kaliurang",
            desc: "Lampu jalan tidak menyala sejak 1 minggu yang lalu",
            loc: "Ngaglik",
            date: "9 Feb",
            eng: "1,850 engagement",
            posts: "8 posts",
            category: "Infrastruktur Listrik",
            assigned: "Dishub Sleman",
            priority: "CRITICAL",
            status: "Open",
            timeline: "Created 9/2/2026"
        },
        {
            id: "ISU005",
            title: "Antrian Panjang di Puskesmas Depok",
            desc: "Pasien mengeluh antrian terlalu lama",
            loc: "Depok",
            date: "9 Feb",
            eng: "980 engagement",
            posts: "6 posts",
            category: "Kesehatan",
            assigned: "Dinas Kesehatan",
            priority: "MEDIUM",
            status: "Open",
            timeline: "Created 9/2/2026"
        }
    ],

    init() {
        this.renderIssues('all');
        this.setupTabs();
    },

    setupTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.renderIssues(tab.dataset.status);
            });
        });
    },

    renderIssues(filterStatus) {
        const container = document.getElementById('issue-list-container');
        const filtered = filterStatus === 'all'
            ? this.allIssues
            : this.allIssues.filter(i => i.status === filterStatus);

        container.innerHTML = filtered.map((issue, index) => `
            <div class="issue-card animate-up" style="animation-delay: ${0.1 * index}s">
                <div class="badge-row">
                    <span class="custom-badge" style="background:#f1f5f9; color:#475569;">${issue.id}</span>
                    <span class="custom-badge badge-priority">${issue.priority}</span>
                    <span class="custom-badge badge-status"><i class="fa-regular fa-clock"></i> ${issue.status}</span>
                </div>
                <h3 style="margin-bottom: 8px;">${issue.title}</h3>
                <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 16px;">${issue.desc}</p>
                
                <div style="display: flex; gap: 24px; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">
                    <span><i class="fa-solid fa-location-dot"></i> ${issue.loc}</span>
                    <span><i class="fa-solid fa-calendar"></i> ${issue.date}</span>
                    <span><i class="fa-solid fa-chart-line"></i> ${issue.eng}</span>
                    <span><i class="fa-solid fa-users"></i> ${issue.posts}</span>
                </div>

                <div class="flex-between" style="border-top: 1px solid #f1f5f9; padding-top: 16px;">
                    <div style="display: flex; gap: 12px; font-size: 0.85rem;">
                        <span>Kategori: <span class="text-primary" style="font-weight:600;">${issue.category}</span></span>
                        <span>Assigned to: <span style="background:#dcfce7; color:#166534; padding:2px 8px; border-radius:4px;">${issue.assigned}</span></span>
                    </div>
                </div>
                <div style="margin-top: 12px; font-size: 0.75rem; color: #ef4444;">
                    Timeline Perkembangan: <br> ${issue.timeline}
                </div>
            </div>
        `).join('');
    }
};

// Aktifkan inisialisasi
document.addEventListener('DOMContentLoaded', () => IssueModule.init());