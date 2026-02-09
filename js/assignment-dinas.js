// ========== ASSIGNMENT DINAS MODULE ==========
console.log('Assignment Dinas module loaded');

// Assignment Dinas Data
let assignmentData = [
  {
    id: 1,
    title: "Penanganan Antrian RSUD Sleman",
    assignedTo: "Dinas Kesehatan",
    assignedBy: "Admin Command Center",
    priority: "critical",
    status: "assigned",
    description: "Follow-up viral video antrian panjang di RSUD Sleman",
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 jam
    createdAt: new Date(),
    department: "Kesehatan"
  },
  {
    id: 2,
    title: "Sampah Tidak Terangkut Depok",
    assignedTo: "DLH Depok",
    assignedBy: "Admin Command Center",
    priority: "high",
    status: "in_progress",
    description: "Koordinasi dengan DLH untuk penanganan sampah",
    deadline: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 jam
    createdAt: new Date(),
    department: "Lingkungan Hidup"
  }
];

// Initialize Assignment Dinas Module
function initAssignmentDinas() {
  console.log('=== INIT ASSIGNMENT DINAS START ===');
  
  renderAssignmentList();
  updateAssignmentStats();
  console.log('Assignment Dinas initialized successfully');
}

// Render Assignment List
function renderAssignmentList() {
  const listContainer = document.getElementById('assignmentList');
  if (!listContainer) {
    console.error('ERROR: assignmentList container not found!');
    return;
  }

  listContainer.innerHTML = assignmentData.map(assignment => `
    <div class="assignment-card ${assignment.status}">
      <div class="assignment-header">
        <div class="assignment-title">${assignment.title}</div>
        <div class="assignment-badge priority-${assignment.priority}">${assignment.priority.toUpperCase()}</div>
      </div>
      
      <div class="assignment-description">${assignment.description}</div>
      
      <div class="assignment-meta">
        <div class="assignment-info">
          <i class="fa-solid fa-building"></i>
          <span>${assignment.assignedTo}</span>
        </div>
        <div class="assignment-info">
          <i class="fa-solid fa-clock"></i>
          <span>${formatDeadline(assignment.deadline)}</span>
        </div>
      </div>
      
      <div class="assignment-actions">
        <button class="assignment-btn primary" onclick="viewAssignmentDetail(${assignment.id})">
          <i class="fa-solid fa-eye"></i> Detail
        </button>
        <button class="assignment-btn success" onclick="updateAssignmentStatus(${assignment.id}, 'completed')">
          <i class="fa-solid fa-check"></i> Selesai
        </button>
      </div>
    </div>
  `).join('');
}

// Update Assignment Statistics
function updateAssignmentStats() {
  const totalAssignments = assignmentData.length;
  const criticalAssignments = assignmentData.filter(a => a.priority === 'critical').length;
  const completedAssignments = assignmentData.filter(a => a.status === 'completed').length;
  const inProgressAssignments = assignmentData.filter(a => a.status === 'in_progress').length;

  // Update stats di dashboard
  const totalElement = document.getElementById('totalAssignments');
  const criticalElement = document.getElementById('criticalAssignments');
  const completedElement = document.getElementById('completedAssignments');
  const progressElement = document.getElementById('progressAssignments');

  if (totalElement) totalElement.textContent = totalAssignments;
  if (criticalElement) criticalElement.textContent = criticalAssignments;
  if (completedElement) completedElement.textContent = completedAssignments;
  if (progressElement) progressElement.textContent = inProgressAssignments;
}

// Format Deadline
function formatDeadline(deadline) {
  const now = new Date();
  const diff = deadline - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diff < 0) return 'Overdue';
  if (hours > 24) return `${Math.floor(hours / 24)} hari lagi`;
  if (hours > 0) return `${hours} jam ${minutes} menit lagi`;
  return `${minutes} menit lagi`;
}

// View Assignment Detail
function viewAssignmentDetail(id) {
  const assignment = assignmentData.find(a => a.id === id);
  if (!assignment) return;

  const modal = document.createElement('div');
  modal.className = 'assignment-modal';
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };

  modal.innerHTML = `
    <div class="assignment-modal-content">
      <div class="assignment-modal-header">
        <h2>Detail Assignment</h2>
        <button class="assignment-modal-close" onclick="this.closest('.assignment-modal').remove()">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      
      <div class="assignment-detail-section">
        <label>Judul Assignment</label>
        <input type="text" value="${assignment.title}" readonly>
      </div>
      
      <div class="assignment-detail-section">
        <label>Dinas Tujuan</label>
        <input type="text" value="${assignment.assignedTo}" readonly>
      </div>
      
      <div class="assignment-detail-section">
        <label>Deskripsi</label>
        <textarea readonly>${assignment.description}</textarea>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div class="assignment-detail-section">
          <label>Priority</label>
          <input type="text" value="${assignment.priority.toUpperCase()}" readonly>
        </div>
        
        <div class="assignment-detail-section">
          <label>Status</label>
          <input type="text" value="${assignment.status.toUpperCase()}" readonly>
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div class="assignment-detail-section">
          <label>Deadline</label>
          <input type="text" value="${assignment.deadline.toLocaleString('id-ID')}" readonly>
        </div>
        
        <div class="assignment-detail-section">
          <label>Dibuat Oleh</label>
          <input type="text" value="${assignment.assignedBy}" readonly>
        </div>
      </div>
      
      <div class="assignment-modal-actions">
        <button class="btn-generate" onclick="this.closest('.assignment-modal').remove()">Tutup</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

// Update Assignment Status
function updateAssignmentStatus(id, newStatus) {
  const assignment = assignmentData.find(a => a.id === id);
  if (assignment) {
    assignment.status = newStatus;
    renderAssignmentList();
    updateAssignmentStats();
    showNotification(`Assignment ${id} status updated to ${newStatus}`, 'success');
  }
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

// Auto-init when assignment view is activated
document.addEventListener('DOMContentLoaded', function() {
  console.log('Assignment Dinas module ready');
});
