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
            id: "ISU003",
            title: "Antrian Panjang di Puskesmas Depok",
            desc: "Pasien mengeluh antrian terlalu lama dan tidak teratur",
            loc: "Depok",
            date: "9 Feb",
            eng: "980 engagement",
            posts: "6 posts",
            category: "Kesehatan",
            assigned: "Dinas Kesehatan",
            priority: "MEDIUM",
            status: "Open",
            timeline: "Created 9/2/2026"
        },
        {
            id: "ISU004",
            title: "Banjir Berbah",
            desc: "Banjir menggenangi beberapa desa di wilayah Berbah",
            loc: "Berbah",
            date: "7 Feb",
            eng: "3,200 engagement",
            posts: "15 posts",
            category: "Bencana & Lingkungan",
            assigned: "BPBD Sleman",
            priority: "HIGH",
            status: "Resolved",
            timeline: "Created 7/2/2026 → Resolved 8/2/2026"
        },
        {
            id: "ISU005",
            title: "Sampah Menumpuk di TPA",
            desc: "Sampah rumah tangga menumpuk selama 3 hari tanpa penanganan",
            loc: "Mlati",
            date: "6 Feb",
            eng: "1,500 engagement",
            posts: "4 posts",
            category: "Bencana & Lingkungan",
            assigned: "Dinas Lingkungan Hidup",
            priority: "MEDIUM",
            status: "Resolved",
            timeline: "Created 6/2/2026 → Resolved 7/2/2026"
        }
    ],

    init() {
        this.renderIssues('all');
        this.setupFilters();
        this.updateCategoryStats();
    },

    setupFilters() {
        const statusFilter = document.getElementById('status-filter');
        const categoryFilter = document.getElementById('category-filter');
        
        if (statusFilter) {
            statusFilter.addEventListener('change', () => {
                this.renderIssues(statusFilter.value, categoryFilter.value);
            });
        }
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => {
                this.renderIssues(statusFilter.value, categoryFilter.value);
            });
        }
    },

    renderIssues(statusFilter = 'all', categoryFilter = 'all') {
        const container = document.getElementById('issue-list-container');
        let filtered = this.allIssues;
        
        // Apply status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(i => i.status === statusFilter);
        }
        
        // Apply category filter
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(i => i.category === categoryFilter);
        }
        
        container.innerHTML = filtered.map((issue, index) => `
            <div class="issue-card animate-up" style="animation-delay: ${0.1 * index}s">
                <div class="badge-row">
                    <span class="custom-badge" style="background:#f1f5f9; color:#475569;">${issue.id}</span>
                    <span class="custom-badge badge-priority">${issue.priority}</span>
                    <span class="custom-badge badge-status"><i class="fa-regular fa-clock"></i> ${issue.status}</span>
                </div>
                <h3>${issue.title}</h3>
                <p>${issue.desc}</p>
                
                <div class="issue-meta">
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
    },

    updateCategoryStats() {
        const categoryGrid = document.getElementById('category-grid');
        if (!categoryGrid) return;
        
        const stats = {
            "Infrastruktur Jalan": 0,
            "Infrastruktur Listrik": 0,
            "Bencana & Lingkungan": 0,
            "Kesehatan": 0
        };
        
        this.allIssues.forEach(issue => {
            if (stats.hasOwnProperty(issue.category)) {
                stats[issue.category]++;
            }
        });
        
        categoryGrid.innerHTML = Object.entries(stats).map(([category, count]) => {
            const categoryClass = category.toLowerCase().replace(/[^a-z0-9]/g, '-');
            return `
                <div class="cat-card cat-${categoryClass}">
                    <span>${category}</span>
                    <strong>${count}</strong>
                </div>
            `;
        }).join('');
    }
};

// Aktifkan inisialisasi
document.addEventListener('DOMContentLoaded', () => IssueModule.init());
