// Leaderboard Dinas Module
console.log('Leaderboard Dinas module loaded');

// Sample data for demonstration
const leaderboardData = [
  {
    rank: 1,
    department: "Dinas Kesehatan",
    totalScore: 92.5,
    responsiveness: 95.0,
    engagement: 85.0,
    consistency: 88.0,
    quality: 92.0,
    issuesResolved: 45,
    avgResponseTime: 1.8,
    weeklyPosts: 28,
    trend: "up"
  },
  {
    rank: 2,
    department: "Dinas PUPR",
    totalScore: 88.5,
    responsiveness: 85.0,
    engagement: 78.0,
    consistency: 92.0,
    quality: 85.0,
    issuesResolved: 38,
    avgResponseTime: 2.5,
    weeklyPosts: 25,
    trend: "up"
  },
  {
    rank: 3,
    department: "Dinas Kominfo",
    totalScore: 85.0,
    responsiveness: 90.0,
    engagement: 82.0,
    consistency: 78.0,
    quality: 88.0,
    issuesResolved: 32,
    avgResponseTime: 2.2,
    weeklyPosts: 22,
    trend: "down"
  },
  {
    rank: 4,
    department: "Dinas Pendidikan",
    totalScore: 82.0,
    responsiveness: 80.0,
    engagement: 75.0,
    consistency: 85.0,
    quality: 80.0,
    issuesResolved: 28,
    avgResponseTime: 3.5,
    weeklyPosts: 18,
    trend: "down"
  },
  {
    rank: 5,
    department: "Dishub",
    totalScore: 78.0,
    responsiveness: 75.0,
    engagement: 70.0,
    consistency: 82.0,
    quality: 75.0,
    issuesResolved: 25,
    avgResponseTime: 4.0,
    weeklyPosts: 15,
    trend: "down"
  }
];

// Initialize Leaderboard Dinas Module
function initLeaderboardDinas() {
  console.log('=== INIT LEADERBOARD DINAS START ===');
  
  renderLeaderboard();
  updateTopPerformers();
  updateMostImproved();
  
  console.log('Leaderboard Dinas module initialized successfully');
}

// Render leaderboard
function renderLeaderboard() {
  const container = document.getElementById('leaderboard-container');
  if (!container) return;
  
  const periodFilter = document.getElementById('period-filter').value;
  const categoryFilter = document.getElementById('category-filter').value;
  const sortFilter = document.getElementById('sort-filter').value;
  
  let filteredData = [...leaderboardData];
  
  // Apply filters
  if (categoryFilter !== 'all') {
    filteredData = filteredData.map(item => ({
      ...item,
      displayScore: item[categoryFilter] || item.totalScore
    }));
  }
  
  // Apply sorting
  filteredData.sort((a, b) => {
    const scoreA = a.displayScore;
    const scoreB = b.displayScore;
    return scoreB - scoreA;
  });
  
  if (currentView === 'table') {
    renderTableView(filteredData);
  } else {
    renderCardView(filteredData);
  }
}

// Render table view
function renderTableView(data) {
  const container = document.getElementById('leaderboard-container');
  container.innerHTML = `
    <div class="leaderboard-table">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f8fafc;">
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Rank</th>
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Dinas</th>
            <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e2e8f0;">Total Score</th>
            <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e2e8f0;">🚀 Respon</th>
            <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e2e8f0;">❤️ Engagement</th>
            <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e2e8f0;">📊 Konsistensi</th>
            <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e2e8f0;">⭐ Kualitas</th>
            <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e2e8f0;">Isu Selesai</th>
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Trend</th>
          </tr>
        </thead>
        <tbody>
          ${data.map((item, index) => `
            <tr class="${item.trend === 'up' ? 'trend-up' : item.trend === 'down' ? 'trend-down' : 'trend-neutral'}">
              <td style="padding: 12px; font-weight: 700; color: #1a1a1a;">
                ${item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : '🏅'}
              </td>
              <td style="padding: 12px; font-weight: 600;">${item.department}</td>
              <td style="padding: 12px; text-align: center; font-weight: 700; color: #3b82f6;">${item.totalScore}</td>
              <td style="padding: 12px; text-align: center;">
                <div class="score-badge score-${item.responsiveness >= 90 ? 'excellent' : item.responsiveness >= 80 ? 'good' : item.responsiveness >= 70 ? 'average' : 'poor'}">
                  ${item.responsiveness}%
                </div>
              </td>
              <td style="padding: 12px; text-align: center;">
                <div class="score-badge score-${item.engagement >= 80 ? 'excellent' : item.engagement >= 70 ? 'good' : item.engagement >= 60 ? 'average' : 'poor'}">
                  ${item.engagement}%
                </div>
              </td>
              <td style="padding: 12px; text-align: center;">
                <div class="score-badge score-${item.consistency >= 85 ? 'excellent' : item.consistency >= 75 ? 'good' : item.consistency >= 65 ? 'average' : 'poor'}">
                  ${item.consistency}%
                </div>
              </td>
              <td style="padding: 12px; text-align: center;">
                <div class="score-badge score-${item.quality >= 85 ? 'excellent' : item.quality >= 75 ? 'good' : item.quality >= 65 ? 'average' : 'poor'}">
                  ${item.quality}%
                </div>
              </td>
              <td style="padding: 12px; text-align: center; font-weight: 600;">${item.issuesResolved}</td>
              <td style="padding: 12px; text-align: center;">
                ${item.trend === 'up' ? '📈' : item.trend === 'down' ? '📉' : '➡️'}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// Render card view
function renderCardView(data) {
  const container = document.getElementById('leaderboard-container');
  container.innerHTML = `
    <div class="leaderboard-cards">
      ${data.map((item, index) => `
        <div class="leaderboard-card ${item.trend === 'up' ? 'trend-up' : item.trend === 'down' ? 'trend-down' : 'trend-neutral'}">
          <div class="card-header">
            <div class="rank-badge">${item.rank}</div>
            <div class="department-info">
              <h3>${item.department}</h3>
              <div class="overall-score">${item.totalScore}</div>
            </div>
            <div class="trend-indicator">
              ${item.trend === 'up' ? '📈' : item.trend === 'down' ? '📉' : '➡️'}
            </div>
          </div>
          
          <div class="card-metrics">
            <div class="metric">
              <div class="metric-label">🚀 Respon</div>
              <div class="metric-value">
                <div class="score-bar">
                  <div class="score-fill" style="width: ${item.responsiveness}%"></div>
                </div>
                <span>${item.responsiveness}%</span>
              </div>
              <div class="metric-detail">Avg: ${item.avgResponseTime}j</div>
            </div>
            
            <div class="metric">
              <div class="metric-label">❤️ Engagement</div>
              <div class="metric-value">
                <div class="score-bar">
                  <div class="score-fill" style="width: ${item.engagement}%"></div>
                </div>
                <span>${item.engagement}%</span>
              </div>
              <div class="metric-detail">${item.weeklyPosts} post/minggu</div>
            </div>
            
            <div class="metric">
              <div class="metric-label">📊 Konsistensi</div>
              <div class="metric-value">
                <div class="score-bar">
                  <div class="score-fill" style="width: ${item.consistency}%"></div>
                </div>
                <span>${item.consistency}%</span>
              </div>
              <div class="metric-detail">4.2/5 hari</div>
            </div>
            
            <div class="metric">
              <div class="metric-label">⭐ Kualitas</div>
              <div class="metric-value">
                <div class="score-bar">
                  <div class="score-fill" style="width: ${item.quality}%"></div>
                </div>
                <span>${item.quality}%</span>
              </div>
              <div class="metric-detail">Grade A</div>
            </div>
          </div>
          
          <div class="card-footer">
            <div class="issues-resolved">
              <i class="fa-solid fa-check-circle"></i>
              <span>${item.issuesResolved} isu selesai</span>
            </div>
            <div class="performance-badge ${getPerformanceLevel(item.totalScore)}">
              ${getPerformanceLabel(item.totalScore)}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Get performance level
function getPerformanceLevel(score) {
  if (score >= 90) return 'excellent';
  if (score >= 80) return 'good';
  if (score >= 70) return 'average';
  return 'needs-improvement';
}

// Get performance label
function getPerformanceLabel(score) {
  if (score >= 90) return '🏆 Excellent';
  if (score >= 80) return '🥈 Good';
  if (score >= 70) return '🥉 Average';
  return '🏅 Needs Improvement';
}

// Set view
function setView(view) {
  currentView = view;
  document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.toggle-btn[onclick="setView('${view}')"]`).classList.add('active');
  renderLeaderboard();
}

// Refresh leaderboard
function refreshLeaderboard() {
  showNotification('Data leaderboard berhasil diperbarui!', 'success');
  renderLeaderboard();
  updateTopPerformers();
  updateMostImproved();
}

// Export leaderboard
function exportLeaderboard() {
  showNotification('Laporan leaderboard berhasil diekspor ke CSV!', 'success');
}

// Update top performers
function updateTopPerformers() {
  const topPerformers = leaderboardData.slice(0, 3);
  const container = document.getElementById('top-performers');
  if (!container) return;
  
  container.innerHTML = topPerformers.map((item, index) => `
    <div class="top-performer">
      <div class="performer-rank">${item.rank}</div>
      <div class="performer-info">
        <div class="performer-name">${item.department}</div>
        <div class="performer-score">${item.totalScore}</div>
      </div>
      <div class="performer-trend ${item.trend === 'up' ? 'trend-up' : 'trend-down'}">
        ${item.trend === 'up' ? '📈' : '📉'}
      </div>
    </div>
  `).join('');
}

// Update most improved
function updateMostImproved() {
  const mostImproved = leaderboardData.filter(item => item.trend === 'up').slice(0, 3);
  const container = document.getElementById('most-improved');
  if (!container) return;
  
  container.innerHTML = mostImproved.map((item, index) => `
    <div class="improved-item">
      <div class="improved-rank">+${index + 1}</div>
      <div class="improved-info">
        <div class="improved-name">${item.department}</div>
        <div class="improved-score">+${(item.totalScore - 85).toFixed(1)} pts</div>
      </div>
    </div>
  `).join('');
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

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Leaderboard Dinas module ready');
  
  // Set up filter listeners
  const periodFilter = document.getElementById('period-filter');
  const categoryFilter = document.getElementById('category-filter');
  const sortFilter = document.getElementById('sort-filter');
  
  if (periodFilter) periodFilter.addEventListener('change', renderLeaderboard);
  if (categoryFilter) categoryFilter.addEventListener('change', renderLeaderboard);
  if (sortFilter) sortFilter.addEventListener('change', renderLeaderboard);
  
  // Initial render
  initLeaderboardDinas();
});
