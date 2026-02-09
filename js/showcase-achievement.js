// Showcase Achievement Module
console.log('Showcase Achievement module loaded');

// Initialize Showcase Achievement Module
function initShowcaseAchievement() {
  console.log('=== INIT SHOWCASE ACHIEVEMENT START ===');
  
  // Initialize achievement grid
  initializeAchievementGrid();
  initializePlatformGrid();
  
  console.log('Showcase Achievement module initialized successfully');
}

// Initialize achievement grid
function initializeAchievementGrid() {
  const achievementGrid = document.getElementById('achievement-grid');
  if (!achievementGrid) return;
  
  const achievementData = [
    {
      id: "speed_responder",
      title: "Penjawat Cepat",
      description: "Menyelesaikan 100+ isu dalam waktu kurang dari 2 jam",
      icon: "🚀",
      value: 95,
      unlocked: true,
      contentTemplates: {
        before: "Sebelum achievement: Respon isu rata-rata 4.5 jam",
        after: "Setelah achievement: Respon isu rata-rata 1.8 jam",
        impact: "Peningkatan 60% kecepatan respon"
      }
    },
    {
      id: "perfect_month",
      title: "Bulan Sempurna",
      description: "Tidak ada isu tertunda selama 1 bulan penuh",
      icon: "🌟",
      value: 100,
      unlocked: true,
      contentTemplates: {
        before: "Sebelum achievement: 15 isu tertunda",
        after: "Setelah achievement: 0 isu tertunda",
        impact: "Peningkatan 100% penyelesaian isu"
      }
    },
    {
      id: "engagement_master",
      title: "Engagement Master",
      description: "Mencapai 85%+ engagement rate tertinggi",
      icon: "❤️",
      value: 85,
      unlocked: true,
      contentTemplates: {
        before: "Sebelum achievement: Engagement rate 65%",
        after: "Setelah achievement: Engagement rate 85%",
        impact: "Peningkatan 31% engagement rate"
      }
    },
    {
      id: "quality_excellent",
      title: "Kualitas Unggulan",
      description: "Mencapai 85%+ kualitas konten",
      icon: "⭐",
      value: 85,
      unlocked: true,
      contentTemplates: {
        before: "Sebelum achievement: Kualitas konten 70%",
        after: "Setelah achievement: Kualitas konten 85%",
        impact: "Peningkatan 21% kualitas konten"
      }
    },
    {
      id: "consistency_champion",
      title: "Konsistensi Juara",
      description: "Posting konsisten 92% dari waktu",
      icon: "📊",
      value: 92,
      unlocked: true,
      contentTemplates: {
        before: "Sebelum achievement: Konsistensi posting 75%",
        after: "Setelah achievement: Konsistensi posting 92%",
        impact: "Peningkatan 23% konsistensi posting"
      }
    },
    {
      id: "community_builder",
      title: "Pembina Komunitas",
      description: "Aktif membangun komunitas pendidikan",
      icon: "🏗️",
      value: 80,
      unlocked: false,
      contentTemplates: {
        before: "Sebelum achievement: Komunitas pasif",
        after: "Target: Komunitas aktif dan berkembang",
        impact: "Target peningkatan partisipasi masyarakat"
      }
    }
  ];
  
  achievementGrid.innerHTML = achievementData.map(achievement => `
    <div class="achievement-card">
      <div class="achievement-icon">${achievement.icon}</div>
      <div class="achievement-content">
        <h4>${achievement.title}</h4>
        <p>${achievement.description}</p>
        <div class="achievement-value">Score: ${achievement.value}</div>
      </div>
      <div class="achievement-status ${achievement.unlocked ? 'unlocked' : 'locked'}">
        ${achievement.unlocked ? '✅ Unlocked' : '🔒 Locked'}
      </div>
    </div>
  `).join('');
}

// Initialize platform grid
function initializePlatformGrid() {
  const platformGrid = document.getElementById('platform-grid');
  if (!platformGrid) return;
  
  const platformData = {
    facebook: { posts: 245, engagement: 4500, reach: 12000, growth: 12.5 },
    instagram: { posts: 189, engagement: 3200, reach: 8500, growth: 18.2 },
    twitter: { posts: 156, engagement: 2800, reach: 9800, growth: 15.3 },
    tiktok: { posts: 98, engagement: 5100, reach: 6500, growth: 22.1 },
    youtube: { posts: 67, engagement: 1200, reach: 3200, growth: 8.7 }
  };
  
  platformGrid.innerHTML = Object.entries(platformData).map(([platform, data]) => `
    <div class="platform-item">
      <div class="platform-icon">${getPlatformIcon(platform)}</div>
      <div class="platform-name">${getPlatformName(platform)}</div>
      <div class="platform-stats">
        <div class="platform-stat-value">${data.posts.toLocaleString()}</div>
        <div class="platform-stat-label">Posts</div>
      </div>
      <div class="platform-stats">
        <div class="platform-stat-value">${data.engagement.toLocaleString()}</div>
        <div class="platform-stat-label">Engagement</div>
      </div>
      <div class="platform-stats">
        <div class="platform-stat-value">${data.reach.toLocaleString()}</div>
        <div class="platform-stat-label">Reach</div>
      </div>
      <div class="platform-progress">
        <div class="platform-progress-fill" style="width: ${data.growth}%"></div>
      </div>
      <div class="platform-stat-label">${data.growth > 0 ? '+' : ''}${Math.abs(data.growth)}%</div>
      </div>
    </div>
  `).join('');
}

// Generate content based on achievement
function generateContent() {
  const dinasSelect = document.getElementById('dinas-select');
  const selectedDinas = dinasSelect.value;
  
  if (!selectedDinas) {
    showNotification('Silakan pilih dinas terlebih dahulu!', 'warning');
    return;
  }
  
  const achievement = {
    id: "speed_responder",
    title: "Penjawat Cepat",
    description: "Menyelesaikan 100+ isu dalam waktu kurang dari 2 jam",
    icon: "🚀",
    value: 95,
    unlocked: true,
    contentTemplates: {
      before: "Sebelum achievement: Respon isu rata-rata 4.5 jam",
      after: "Setelah achievement: Respon isu rata-rata 1.8 jam",
      impact: "Peningkatan 60% kecepatan respon"
    }
  };
  
  if (achievement) {
    const content = generateAchievementContent(achievement);
    displayGeneratedContent(content);
    showNotification('Konten berhasil digenerate!', 'success');
  }
}

// Generate achievement content
function generateAchievementContent(achievement) {
  const templates = achievement.contentTemplates;
  const beforeAfter = `
    <div class="before-after-comparison">
      <h3>📊 Before-After Analysis</h3>
      <div class="comparison-cards">
        <div class="comparison-card before">
          <h4>📉 Before Achievement</h4>
          <p><strong>${templates.before}</strong></p>
          <div class="metrics">
            <div class="metric">
              <span class="metric-label">Respon Time:</span>
              <span class="metric-value poor">4.5 jam</span>
            </div>
            <div class="metric">
              <span class="metric-label">Engagement:</span>
              <span class="metric-value poor">65%</span>
            </div>
          </div>
        </div>
        <div class="comparison-card after">
          <h4>📈 After Achievement</h4>
          <p><strong>${templates.after}</strong></p>
          <div class="metrics">
            <div class="metric">
              <span class="metric-label">Respon Time:</span>
              <span class="metric-value excellent">1.8 jam</span>
            </div>
            <div class="metric">
              <span class="metric-label">Engagement:</span>
              <span class="metric-value excellent">85%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  return `
    <div class="generated-content">
      <h3>🎯 Generated Content: ${achievement.title}</h3>
      <div class="content-preview">
        <div class="achievement-badge">${achievement.icon}</div>
        <div class="achievement-info">
          <h4>${achievement.title}</h4>
          <p>${achievement.description}</p>
          <div class="achievement-value">Score: ${achievement.value}</div>
        </div>
      </div>
      ${beforeAfter}
      <div class="content-actions">
        <button class="btn-generate" onclick="copyContent()">
          <i class="fa-solid fa-copy"></i> Copy Content
        </button>
        <button class="btn-generate" onclick="publishContent()">
          <i class="fa-solid fa-share"></i> Publish to Platforms
        </button>
      </div>
    </div>
  `;
}

// Generate narrative
function generateNarrative() {
  const dinasSelect = document.getElementById('dinas-select');
  const periodSelect = document.getElementById('period-select');
  const selectedDinas = dinasSelect.value;
  const selectedPeriod = periodSelect.value;
  
  if (!selectedDinas || !selectedPeriod) {
    showNotification('Silakan pilih dinas dan periode terlebih dahulu!', 'warning');
    return;
  }
  
  const narrative = generateCounterNarrative(selectedDinas, selectedPeriod);
  displayNarrative(narrative);
  showNotification('Narasi berhasil digenerate!', 'success');
}

// Generate counter-narrative
function generateCounterNarrative(dinas, period) {
  const metrics = {
    totalIssues: Math.floor(Math.random() * 50) + 20,
    resolvedIssues: Math.floor(Math.random() * 40) + 15,
    avgResponseTime: (Math.random() * 2 + 1).toFixed(1),
    engagementRate: Math.floor(Math.random() * 30) + 70,
    satisfactionScore: Math.floor(Math.random() * 20) + 80
  };
  
  const periodText = {
    week: 'minggu ini',
    month: 'bulan ini',
    quarter: 'kuartal ini',
    year: 'tahun ini'
  }[period] || 'minggu ini';
  
  return `
    <div class="narrative-content">
      <h3>📊 Narasi Kinerja ${dinas} - ${periodText}</h3>
      <div class="narrative-stats">
        <div class="stat-item">
          <span class="stat-label">Total Isu:</span>
          <span class="stat-value">${metrics.totalIssues}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Diselesaikan:</span>
          <span class="stat-value">${metrics.resolvedIssues}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Respon Rata-rata:</span>
          <span class="stat-value">${metrics.avgResponseTime} jam</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Engagement Rate:</span>
          <span class="stat-value">${metrics.engagementRate}%</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Kepuasan:</span>
          <span class="stat-value">${metrics.satisfactionScore}%</span>
        </div>
      </div>
      <div class="narrative-text">
        <p><strong>Analisis Kinerja:</strong></p>
        <p>${dinas} berhasil menunjukkan peningkatan kinerja yang signifikan pada periode ${periodText}. Dari total ${metrics.totalIssues} isu yang masuk, sebanyak ${metrics.resolvedIssues} isu berhasil diselesaikan dengan tingkat kepuasan ${metrics.satisfactionScore}%.</p>
        <p>Waktu respon rata-rata menurun menjadi ${metrics.avgResponseTime} jam, menunjukkan efisiensi yang lebih baik dalam penanganan isu publik. Engagement rate mencapai ${metrics.engagementRate}%, mengindikasikan adopsi masyarakat terhadap informasi dan layanan yang disediakan.</p>
        <p><strong>Rekomendasi:</strong></p>
        <p>1. Pertahankan konsistensi dalam penanganan isu</p>
        <p>2. Terus tingkatkan kualitas konten dan interaksi dengan masyarakat</p>
        <p>3. Lakukan evaluasi berkala untuk identifikasi area perbaikan</p>
      </div>
    </div>
  `;
}

// Display generated content
function displayGeneratedContent(content) {
  const output = document.getElementById('narrative-output');
  if (output) {
    output.innerHTML = content;
  }
}

// Display narrative
function displayNarrative(narrative) {
  const output = document.getElementById('narrative-output');
  if (output) {
    output.innerHTML = narrative;
  }
}

// Copy content
function copyContent() {
  const content = document.getElementById('narrative-output');
  if (content) {
    const text = content.innerText;
    navigator.clipboard.writeText(text);
    showNotification('Konten berhasil disalin ke clipboard!', 'success');
  }
}

// Publish content
function publishContent() {
  showNotification('Konten akan dipublish ke platform yang tersedia!', 'success');
  // Here you would integrate with actual platform APIs
}

// Preview content
function previewContent() {
  showNotification('Preview mode diaktifkan!', 'info');
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  const bgColor = type === 'success' ? '#dcfce7' : type === 'warning' ? '#fef3c7' : '#dbeafe';
  const textColor = type === 'success' ? '#166534' : type === 'warning' ? '#92400e' : '#1e40af';
  const icon = type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
  
  notification.style.cssText = `
    position: fixed; top: 20px; right: 20px;
    background: ${bgColor}; color: ${textColor};
    padding: 15px 20px; border-radius: 8px;
    border-left: 4px solid ${type === 'success' ? '#16a34a' : type === 'warning' ? '#d97706' : '#2563eb'};
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 3000; max-width: 400px;
    font-size: 0.9rem; font-weight: 500;
    animation: slideIn 0.3s ease-out;
  `;
  
  notification.innerHTML = `${icon} ${message}`;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Helper functions
function getPlatformIcon(platform) {
  const icons = {
    facebook: 'fab fa-facebook',
    instagram: 'fab fa-instagram',
    twitter: 'fab fa-twitter',
    tiktok: 'fab fa-tiktok',
    youtube: 'fab fa-youtube'
  };
  return icons[platform] || 'fa-solid fa-question';
}

function getPlatformName(platform) {
  const names = {
    facebook: 'Facebook',
    instagram: 'Instagram', 
    twitter: 'Twitter',
    tiktok: 'TikTok',
    youtube: 'YouTube'
  };
  return names[platform] || 'Platform';
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Showcase Achievement module ready');
  
  // Update current date
  function updateCurrentDate() {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    const dateString = now.toLocaleDateString('id-ID', options);
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
      dateElement.textContent = dateString;
    }
  }
  
  updateCurrentDate();
  setInterval(updateCurrentDate, 60000); // Update every minute
  
  // Initialize modules
  initShowcaseAchievement();
});
