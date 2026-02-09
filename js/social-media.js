// ========== SOCIAL MEDIA MANAGEMENT MODULE ==========
console.log('Social Media Management module loaded');

// OPD Data
let opdData = [
  {
    id: 1,
    name: 'PUPR',
    fullName: 'Dinas Pekerjaan Umum dan Perumahan Rakyat',
    platforms: [
      { name: 'Instagram', handle: '@pupr_sleman', status: 'connected' },
      { name: 'Facebook', handle: 'PUPR Sleman', status: 'connected' },
      { name: 'Twitter/X', handle: '@PUPR_Sleman', status: 'connected' },
      { name: 'TikTok', handle: '@pupr_sleman', status: 'connected' },
      { name: 'YouTube', handle: 'PUPR Sleman', status: 'connected' },
      { name: 'LinkedIn', handle: 'PUPR Sleman', status: 'connected' },
      { name: 'WhatsApp Business', handle: 'PUPR Sleman', status: 'connected' }
    ],
    postsThisMonth: 12,
    avgEngagement: '704',
    bestTime: '10:00 AM'
  },
  {
    id: 2,
    name: 'Dishub',
    fullName: 'Dinas Perhubungan',
    platforms: [
      { name: 'Instagram', handle: '@dishub_sleman', status: 'connected' },
      { name: 'Facebook', handle: 'Dishub Sleman', status: 'connected' },
      { name: 'Twitter/X', handle: '@Dishub_Sleman', status: 'connected' },
      { name: 'TikTok', handle: '@dishub_sleman', status: 'connected' },
      { name: 'YouTube', handle: 'Dishub Sleman', status: 'connected' },
      { name: 'LinkedIn', handle: 'Dishub Sleman', status: 'connected' },
      { name: 'WhatsApp Business', handle: 'Dishub Sleman', status: 'connected' }
    ],
    postsThisMonth: 12,
    avgEngagement: '436',
    bestTime: '14:00 PM'
  },
  {
    id: 3,
    name: 'PDAM',
    fullName: 'Perusahaan Daerah Air Minum',
    platforms: [
      { name: 'Instagram', handle: '@pdam_sleman', status: 'connected' },
      { name: 'Facebook', handle: 'PDAM Sleman', status: 'connected' },
      { name: 'Twitter/X', handle: '@PDAM_Sleman', status: 'connected' },
      { name: 'TikTok', handle: '@pdam_sleman', status: 'connected' },
      { name: 'YouTube', handle: 'PDAM Sleman', status: 'connected' },
      { name: 'LinkedIn', handle: 'PDAM Sleman', status: 'connected' },
      { name: 'WhatsApp Business', handle: '@PDAM_Sleman', status: 'connected' }
    ],
    postsThisMonth: 8,
    avgEngagement: '1028',
    bestTime: '09:00 AM'
  },
  {
    id: 4,
    name: 'BPBD',
    fullName: 'Badan Perencanaan Pembangunan Daerah',
    platforms: [
      { name: 'Instagram', handle: '@bpbd_sleman', status: 'connected' },
      { name: 'Facebook', handle: 'BPBD Sleman', status: 'connected' },
      { name: 'Twitter/X', handle: '@BPBD_Sleman', status: 'connected' },
      { name: 'TikTok', handle: '@bpbd_sleman', status: 'connected' },
      { name: 'YouTube', handle: '@BPBD_Sleman', status: 'connected' },
      { name: 'LinkedIn', handle: '@BPBD_Sleman', status: 'connected' },
      { name: 'WhatsApp Business', handle: '@BPBD_Sleman', status: 'connected' }
    ],
    postsThisMonth: 15,
    avgEngagement: '892',
    bestTime: '11:00 AM'
  },
  {
    id: 5,
    name: 'Dinkes',
    fullName: 'Dinas Lingkungan Hidup',
    platforms: [
      { name: 'Instagram', handle: '@dinkes_sleman', status: 'connected' },
      { name: 'Facebook', handle: 'Dinkes Sleman', status: 'connected' },
      { name: 'Twitter/X', handle: '@Dinkes_Sleman', status: 'connected' },
      { name: 'TikTok', handle: '@dinkes_sleman', status: 'connected' },
      { name: 'YouTube', handle: '@Dinkes_Sleman', status: 'connected' },
      { name: 'LinkedIn', handle: '@Dinkes_Sleman', status: 'connected' },
      { name: 'WhatsApp Business', handle: '@Dinkes_Sleman', status: 'connected' }
    ],
    postsThisMonth: 10,
    avgEngagement: '756',
    bestTime: '08:00 AM'
  }
];

// Content Schedule Data
let scheduleData = [
  {
    id: 1,
    opd: 'pupr',
    platform: 'instagram',
    date: '2026-02-10',
    time: '10:00',
    content: 'Perbaikan jalan di Sinduharjo telah selesai! Terima kasih atas kesabaran warga. #SlemanBersih',
    status: 'scheduled'
  },
  {
    id: 2,
    opd: 'pdam',
    platform: 'facebook',
    date: '2026-02-12',
    time: '13:00',
    content: 'Info penting: Jadwal pemeliharaan pipa air tanggal 12-13 Feb. Mohon simpan air. #InfoPDAM',
    status: 'scheduled'
  }
];

// Content Templates
let templateData = [
  {
    id: 1,
    opd: 'pupr',
    category: 'Infrastruktur',
    title: 'Pengumuman Infrastruktur',
    content: '🏗️ Perbaikan jalan di Sinduharjo telah selesai! Terima kasih atas kesabaran warga. #SlemanBersih',
    length: 160,
    tags: ['Infrastruktur'],
    createdAt: new Date()
  },
  {
    id: 2,
    opd: 'pdam',
    category: 'Informasi',
    title: 'Info PDAM',
    content: '💧 Info penting: Jadwal pemeliharaan pipa air tanggal 12-13 Feb. Mohon simpan air. #InfoPDAM',
    length: 120,
    tags: ['Informasi'],
    createdAt: new Date()
  }
];

// Generate Dynamic Calendar
function generateCalendar() {
  const calendarDays = document.getElementById('calendar-days');
  if (!calendarDays) return;
  
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const today = now.getDate();
  
  // Get first day of month and number of days
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Adjust for Monday-first calendar (0 = Monday, 6 = Sunday)
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
  
  let calendarHTML = '';
  
  // Add empty cells for days before month starts
  for (let i = 0; i < adjustedFirstDay; i++) {
    calendarHTML += '<div class="calendar-day empty"></div>';
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const daySchedules = scheduleData.filter(schedule => schedule.date === dateStr);
    const hasPosts = daySchedules.length > 0;
    const isToday = day === today;
    
    let dayClasses = 'calendar-day';
    if (isToday) dayClasses += ' today';
    if (hasPosts) dayClasses += ' has-posts';
    if (daySchedules.length > 1) dayClasses += ' has-multiple-posts';
    
    calendarHTML += `
      <div class="${dayClasses}" onclick="showDaySchedules('${dateStr}')">
        <div class="calendar-date">${day}</div>
        ${hasPosts ? `
          <div class="calendar-posts">${daySchedules.length}</div>
        ` : ''}
      </div>
    `;
  }
  
  calendarDays.innerHTML = calendarHTML;
}

// Show schedules for specific day
function showDaySchedules(date) {
  const daySchedules = scheduleData.filter(schedule => schedule.date === date);
  
  if (daySchedules.length === 0) {
    showNotification('Tidak ada jadwal posting untuk tanggal ini', 'info');
    return;
  }
  
  // Create modal to show day's schedules
  const modal = document.createElement('div');
  modal.className = 'social-media-modal';
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };

  const scheduleHTML = daySchedules.map(schedule => {
    const platformIcon = {
      'instagram': '<i class="fa-brands fa-instagram" style="color: #E4405F;"></i>',
      'facebook': '<i class="fa-brands fa-facebook" style="color: #1877F2;"></i>',
      'twitter': '<i class="fa-brands fa-x-twitter" style="color: #000000;"></i>',
      'tiktok': '<i class="fa-brands fa-tiktok" style="color: #000000;"></i>'
    };
    
    const opdName = opdData.find(o => o.name === schedule.opd)?.fullName || schedule.opd.toUpperCase();
    
    return `
      <div class="schedule-item" style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #10b981;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            ${platformIcon[schedule.platform] || ''}
            <strong>${opdName}</strong>
          </div>
          <span style="background: #10b981; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem;">
            ${schedule.time}
          </span>
        </div>
        <div style="color: #374151; font-size: 0.9rem;">
          ${schedule.content}
        </div>
      </div>
    `;
  }).join('');

  const dateObj = new Date(date + 'T00:00:00');
  const formattedDate = dateObj.toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  modal.innerHTML = `
    <div class="social-media-modal-content" style="max-width: 600px;">
      <div class="social-media-modal-header">
        <h2><i class="fa-solid fa-calendar-day"></i> Jadwal - ${formattedDate}</h2>
        <button class="social-media-modal-close" onclick="this.closest('.social-media-modal').remove()">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      
      <div style="max-height: 400px; overflow-y: auto;">
        ${scheduleHTML}
      </div>
      
      <div class="social-media-modal-actions">
        <button class="btn-generate" onclick="this.closest('.social-media-modal').remove()">Tutup</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

// Update Calendar View
function updateCalendarView() {
  generateCalendar();
}
// Initialize Social Media Management Module
function initSocialMedia() {
  console.log('=== INIT SOCIAL MEDIA MANAGEMENT START ===');
  
  // Initialize character counter
  initCharacterCounter();
  
  // Generate calendar
  generateCalendar();
  
  // Set default date to today
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('post-date');
  if (dateInput) {
    dateInput.value = today;
    dateInput.min = today; // Prevent selecting past dates
  }
  
  console.log('Social Media Management module initialized successfully');
}

// Manage OPD
function manageOPD(opdId) {
  console.log(`Managing OPD: ${opdId}`);
  showNotification(`Membuka halaman kelola ${opdId.toUpperCase()}`, 'info');
  
  const opd = opdData.find(o => o.id === opdId);
  if (opd) {
    showOPDModal(opd);
  }
}

// Show OPD Modal
function showOPDModal(opd) {
  const modal = document.createElement('div');
  modal.className = 'social-media-modal';
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };

  modal.innerHTML = `
    <div class="social-media-modal-content">
      <div class="social-media-modal-header">
        <h2>Kelola ${opd.fullName}</h2>
        <button class="social-media-modal-close" onclick="this.closest('.social-media-modal').remove()">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      
      <div class="social-media-detail-section">
        <label>OPD</label>
        <input type="text" value="${opd.name}" readonly>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div class="social-media-detail-section">
          <label>Posts Bulan Ini</label>
          <input type="text" value="${opd.postsThisMonth}" readonly>
        </div>
        
        <div class="social-media-detail-section">
          <label>Avg Engagement</label>
          <input type="text" value="${opd.avgEngagement}" readonly>
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div class="social-media-detail-section">
          <label>Best Time</label>
          <input type="text" value="${opd.bestTime}" readonly>
        </div>
        
        <div class="social-media-detail-section">
          <label>Status</label>
          <input type="text" value="Connected" readonly>
        </div>
      </div>
      
      <div class="social-media-modal-actions">
        <button class="btn-generate" onclick="this.closest('.social-media-modal').remove()">Tutup</button>
        <button class="btn-generate" style="background: #3b82f6;" onclick="editOPD('${opd.id}')">
          <i class="fa-solid fa-edit"></i> Edit
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

// Add New OPD
function addNewOPD() {
  console.log('Adding new OPD');
  showNotification('Form tambah OPD baru akan segera tersedia!', 'info');
}

// Open Calendar Modal
function openCalendarModal() {
  console.log('Opening calendar modal');
  showNotification('Membuka kalender konten', 'info');
}

// Schedule Post
function schedulePost() {
  console.log('Scheduling post');
  
  // Get form values
  const opd = document.getElementById('opd-select').value;
  const content = document.getElementById('post-content').value;
  const date = document.getElementById('post-date').value;
  const time = document.getElementById('post-time').value;
  
  // Get selected platforms
  const platformCheckboxes = document.querySelectorAll('.platform-checkbox:checked');
  const platforms = Array.from(platformCheckboxes).map(cb => cb.value);
  
  // Validation
  if (!opd) {
    showNotification('Silakan pilih OPD terlebih dahulu!', 'warning');
    return;
  }
  
  if (platforms.length === 0) {
    showNotification('Silakan pilih minimal satu platform!', 'warning');
    return;
  }
  
  if (!content.trim()) {
    showNotification('Silakan isi konten postingan!', 'warning');
    return;
  }
  
  if (!date || !time) {
    showNotification('Silakan pilih tanggal dan waktu posting!', 'warning');
    return;
  }
  
  // Create schedule entries for each platform
  const newSchedules = platforms.map(platform => ({
    id: scheduleData.length + platforms.indexOf(platform) + 1,
    opd: opd,
    platform: platform,
    date: date,
    time: time,
    content: content,
    status: 'scheduled'
  }));
  
  // Add to schedule data
  scheduleData.push(...newSchedules);
  
  // Success notification
  const platformNames = platforms.map(p => {
    const nameMap = {
      'instagram': 'Instagram',
      'facebook': 'Facebook', 
      'twitter': 'Twitter/X',
      'tiktok': 'TikTok'
    };
    return nameMap[p] || p;
  }).join(', ');
  
  showNotification(`✅ Jadwal posting berhasil disimpan untuk ${platformNames}!`, 'success');
  
  // Clear form
  clearScheduleForm();
  
  // Update calendar view (if function exists)
  if (typeof updateCalendarView === 'function') {
    updateCalendarView();
  }
}

// Clear schedule form
function clearScheduleForm() {
  document.getElementById('opd-select').value = '';
  document.getElementById('post-content').value = '';
  document.getElementById('post-date').value = '';
  document.getElementById('post-time').value = '';
  document.getElementById('char-count').textContent = '0 / 500 karakter';
  document.getElementById('char-count').className = '';
  
  // Uncheck all platform checkboxes
  document.querySelectorAll('.platform-checkbox').forEach(cb => cb.checked = false);
}

// Character counter for post content
function initCharacterCounter() {
  const contentTextarea = document.getElementById('post-content');
  const charCount = document.getElementById('char-count');
  
  if (contentTextarea && charCount) {
    const maxLength = 500;
    
    contentTextarea.addEventListener('input', function() {
      const currentLength = this.value.length;
      const remaining = maxLength - currentLength;
      
      charCount.textContent = `${currentLength} / ${maxLength} karakter`;
      
      // Change color based on length
      charCount.className = '';
      if (remaining <= 50 && remaining > 20) {
        charCount.classList.add('warning');
      } else if (remaining <= 20) {
        charCount.classList.add('danger');
      }
      
      // Prevent exceeding max length
      if (currentLength > maxLength) {
        this.value = this.value.substring(0, maxLength);
        charCount.textContent = `${maxLength} / ${maxLength} karakter`;
      }
    });
  }
}

// View Schedule
function viewSchedule() {
  console.log('Viewing schedule');
  
  if (scheduleData.length === 0) {
    showNotification('Belum ada jadwal posting yang tersimpan', 'info');
    return;
  }
  
  // Create modal to show schedule
  const modal = document.createElement('div');
  modal.className = 'social-media-modal';
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };

  const scheduleHTML = scheduleData.map(schedule => {
    const platformIcon = {
      'instagram': '<i class="fa-brands fa-instagram" style="color: #E4405F;"></i>',
      'facebook': '<i class="fa-brands fa-facebook" style="color: #1877F2;"></i>',
      'twitter': '<i class="fa-brands fa-x-twitter" style="color: #000000;"></i>',
      'tiktok': '<i class="fa-brands fa-tiktok" style="color: #000000;"></i>'
    };
    
    const opdName = opdData.find(o => o.name === schedule.opd)?.fullName || schedule.opd.toUpperCase();
    
    return `
      <div class="schedule-item" style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #3b82f6;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            ${platformIcon[schedule.platform] || ''}
            <strong>${opdName}</strong>
          </div>
          <span style="background: #10b981; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem;">
            ${schedule.status === 'scheduled' ? 'Terjadwal' : schedule.status}
          </span>
        </div>
        <div style="color: #374151; margin-bottom: 8px; font-size: 0.9rem;">
          ${schedule.content}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: #64748b;">
          <span><i class="fa-solid fa-calendar"></i> ${schedule.date}</span>
          <span><i class="fa-solid fa-clock"></i> ${schedule.time}</span>
        </div>
      </div>
    `;
  }).join('');

  modal.innerHTML = `
    <div class="social-media-modal-content" style="max-width: 700px;">
      <div class="social-media-modal-header">
        <h2><i class="fa-solid fa-list"></i> Jadwal Posting</h2>
        <button class="social-media-modal-close" onclick="this.closest('.social-media-modal').remove()">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      
      <div style="max-height: 400px; overflow-y: auto;">
        ${scheduleHTML}
      </div>
      
      <div class="social-media-modal-actions">
        <button class="btn-generate" onclick="this.closest('.social-media-modal').remove()">Tutup</button>
        <button class="btn-generate" style="background: #ef4444;" onclick="clearAllSchedules()">
          <i class="fa-solid fa-trash"></i> Hapus Semua
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

// Clear all schedules
function clearAllSchedules() {
  if (confirm('Apakah Anda yakin ingin menghapus semua jadwal posting?')) {
    scheduleData = [];
    showNotification('Semua jadwal posting telah dihapus', 'success');
    document.querySelector('.social-media-modal').remove();
  }
}

// Create Template
function createTemplate() {
  console.log('Creating new template');
  showNotification('Form buat template baru akan segera tersedia!', 'info');
}

// Use Template
function useTemplate(templateId) {
  console.log(`Using template: ${templateId}`);
  const template = templateData.find(t => t.id === templateId);
  if (template) {
    showNotification(`Template "${template.title}" sedang digunakan!`, 'success');
  }
}

// Edit Template
function editTemplate(templateId) {
  console.log(`Editing template: ${templateId}`);
  const template = templateData.find(t => t.id === templateId);
  if (template) {
    showNotification(`Mengedit template "${template.title}"`, 'info');
  }
}

// Sync Accounts
function syncAccounts() {
  console.log('Syncing accounts');
  showNotification('Sinkronisasi akun media sosial...', 'success');
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

// Auto-init when social media view is activated
document.addEventListener('DOMContentLoaded', function() {
  console.log('Social Media Management module ready');
  
  updateCurrentDate();
  setInterval(updateCurrentDate, 60000); // Update every minute
  
  // Initialize Social Media Management
  setTimeout(() => {
    if (typeof initSocialMedia === 'function') {
      initSocialMedia();
    }
  }, 100);
});
