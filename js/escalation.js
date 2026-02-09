// Escalation Management System
console.log('escalation.js loaded!');
let escalationHistory = [];
let currentFilter = 'all';

// Simulasi data untuk demo
function loadDemoEscalations() {
  const now = new Date();

  // Escalation 1 - Akan disimulasikan dari pending -> responded -> done
  const esc1 = {
    id: now.getTime(),
    timestamp: new Date(),
    target: 'Kepala Dinas Kesehatan',
    urgency: 'immediate',
    issue: 'Video viral antrian RSUD Sleman - 50K views in 2 hours',
    message: 'Eskalasi terkait antrian RSUD yang viral di TikTok',
    status: 'pending',
    method: 'whatsapp'
  };
  escalationHistory.push(esc1);
  showEscalationCard(esc1);

  // Simulasi: 5 detik -> responded
  setTimeout(() => {
    showNotificationResponse(esc1.target, 'Terima kasih informasinya. Kami segera koordinasi dengan pihak RSUD untuk mengatasi masalah antrian ini.');
    setTimeout(() => {
      esc1.status = 'responded';
      updateEscalationCard(esc1.id);
    }, 1000);
  }, 5000);

  // Simulasi: 10 detik -> done
  setTimeout(() => {
    showNotificationDone(esc1.target, 'Masalah telah ditangani. Tim RSUD sudah menambah loket pendaftaran dan sistem antrian online telah diaktifkan.');
    setTimeout(() => {
      esc1.status = 'done';
      updateEscalationCard(esc1.id);
    }, 1000);
  }, 10000);

  // Escalation 2 - Akan disimulasikan dari pending -> responded -> done (delay lebih lama)
  const esc2 = {
    id: now.getTime() + 1,
    timestamp: new Date(),
    target: 'Humas Pemkab Sleman',
    urgency: 'high',
    issue: 'Keluhan pelayanan publik trending di Twitter - 15K mentions',
    message: 'Perlu press release segera untuk klarifikasi',
    status: 'pending',
    method: 'email'
  };
  escalationHistory.push(esc2);
  showEscalationCard(esc2);

  // Simulasi: 15 detik -> responded
  setTimeout(() => {
    showNotificationResponse(esc2.target, 'Baik, kami terima laporannya. Press release sedang disiapkan oleh tim kami.');
    setTimeout(() => {
      esc2.status = 'responded';
      updateEscalationCard(esc2.id);
    }, 1000);
  }, 15000);

  // Simulasi: 20 detik -> done
  setTimeout(() => {
    showNotificationDone(esc2.target, 'Press release telah dipublikasikan di media sosial resmi Pemkab Sleman dan website resmi.');
    setTimeout(() => {
      esc2.status = 'done';
      updateEscalationCard(esc2.id);
    }, 1000);
  }, 20000);
}

function showNotificationResponse(dinas, message) {
  const notif = document.createElement('div');
  notif.style.cssText = `
    position: fixed; top: 20px; right: 20px;
    background: #eff6ff; padding: 20px; border-radius: 12px;
    border-left: 4px solid #3b82f6; box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    z-index: 2000; max-width: 400px; animation: slideIn 0.3s;
  `;
  notif.innerHTML = `
    <div style="display: flex; align-items: start; gap: 12px;">
      <i class="fa-solid fa-reply" style="color: #3b82f6; font-size: 1.5rem; margin-top: 2px;"></i>
      <div>
        <h4 style="color: #1e40af; margin-bottom: 8px; font-size: 0.95rem;">
          ${dinas} Merespon
        </h4>
        <p style="font-size: 0.85rem; color: #1e40af; line-height: 1.4; margin: 0;">
          "${message}"
        </p>
      </div>
    </div>
  `;
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.style.animation = 'slideOut 0.3s';
    setTimeout(() => notif.remove(), 300);
  }, 4000);
}

function showNotificationDone(dinas, message) {
  const notif = document.createElement('div');
  notif.style.cssText = `
    position: fixed; top: 20px; right: 20px;
    background: #f0fdf4; padding: 20px; border-radius: 12px;
    border-left: 4px solid #16a34a; box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    z-index: 2000; max-width: 400px; animation: slideIn 0.3s;
  `;
  notif.innerHTML = `
    <div style="display: flex; align-items: start; gap: 12px;">
      <i class="fa-solid fa-check-circle" style="color: #16a34a; font-size: 1.5rem; margin-top: 2px;"></i>
      <div>
        <h4 style="color: #166534; margin-bottom: 8px; font-size: 0.95rem;">
          ${dinas} Menyelesaikan Tugas
        </h4>
        <p style="font-size: 0.85rem; color: #166534; line-height: 1.4; margin: 0;">
          "${message}"
        </p>
      </div>
    </div>
  `;
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.style.animation = 'slideOut 0.3s';
    setTimeout(() => notif.remove(), 300);
  }, 4000);
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded - escalation.js');

  const escalationTarget = document.getElementById('escalationTarget');
  console.log('escalationTarget element:', escalationTarget);

  if (escalationTarget) {
    escalationTarget.addEventListener('change', updateContactInfo);
    updateContactInfo();
  }

  // Test apakah sendEscalation function ada
  console.log('sendEscalation function exists?', typeof sendEscalation);

  // Load demo data saat halaman load
  setTimeout(() => {
    const trackingCards = document.getElementById('trackingCards');
    console.log('trackingCards element:', trackingCards);
    if (trackingCards) {
      console.log('Loading demo escalations...');
      loadDemoEscalations();
    }
  }, 500);
});

function updateContactInfo() {
  const select = document.getElementById('escalationTarget');
  if (!select) return;
  const option = select.options[select.selectedIndex];

  document.getElementById('picPhone').textContent = option.dataset.phone;
  document.getElementById('picWA').textContent = option.dataset.wa;
  document.getElementById('picEmail').textContent = option.dataset.email;
  document.getElementById('contactInfo').style.display = 'block';
}

function sendEscalation() {
  console.log('=== SEND ESCALATION START ===');

  const select = document.getElementById('escalationTarget');
  console.log('Select element:', select);

  if (!select) {
    console.error('ERROR: escalationTarget select not found!');
    alert('Error: Escalation target dropdown not found');
    return;
  }

  const escalationTarget = select.options[select.selectedIndex].text;
  console.log('Target:', escalationTarget);

  const urgencyLevel = document.getElementById('urgencyLevel').value;
  console.log('Urgency:', urgencyLevel);

  const detectedIssue = document.getElementById('detectedIssue').value;
  console.log('Issue:', detectedIssue);

  const message = document.getElementById('escalationMessage').value;
  console.log('Message:', message);

  const email = select.options[select.selectedIndex].dataset.email;
  console.log('Email:', email);

  const finalMessage = message || generateEscalationMessage(detectedIssue, urgencyLevel);
  console.log('Final message length:', finalMessage.length);

  const escalation = {
    id: Date.now(),
    timestamp: new Date(),
    target: escalationTarget,
    urgency: urgencyLevel,
    issue: detectedIssue,
    message: finalMessage,
    status: 'pending',
    method: 'email'
  };

  console.log('Escalation object:', escalation);
  escalationHistory.unshift(escalation);
  console.log('Added to history. Total escalations:', escalationHistory.length);

  console.log('Calling showEscalationCard...');
  showEscalationCard(escalation);

  console.log('Calling showSuccessModal...');
  showSuccessModal(escalationTarget, email, urgencyLevel);

  // Simulasi auto-response dari dinas (5 detik setelah send)
  console.log('Setting up auto-response timers...');
  setTimeout(() => {
    console.log('5 seconds - showing response notification');
    showNotificationResponse(escalationTarget, 'Terima kasih informasinya. Kami akan segera menindaklanjuti laporan ini.');
    setTimeout(() => {
      console.log('Updating status to responded');
      escalation.status = 'responded';
      updateEscalationCard(escalation.id);
    }, 1000);
  }, 5000);

  // Simulasi done (10 detik setelah send)
  setTimeout(() => {
    console.log('10 seconds - showing done notification');
    showNotificationDone(escalationTarget, 'Masalah telah ditangani dan diselesaikan. Terima kasih atas laporannya.');
    setTimeout(() => {
      console.log('Updating status to done');
      escalation.status = 'done';
      updateEscalationCard(escalation.id);
    }, 1000);
  }, 10000);

  startEscalationTimer(escalation);
  console.log('=== SEND ESCALATION END ===');
}

startEscalationTimer(escalation);
}

function sendViaWhatsApp() {
  const select = document.getElementById('escalationTarget');
  const escalationTarget = select.options[select.selectedIndex].text;
  const wa = select.options[select.selectedIndex].dataset.wa;
  const detectedIssue = document.getElementById('detectedIssue').value;
  const urgencyLevel = document.getElementById('urgencyLevel').value;
  const message = document.getElementById('escalationMessage').value;

  const finalMessage = message || generateEscalationMessage(detectedIssue, urgencyLevel);

  const escalation = {
    id: Date.now(),
    timestamp: new Date(),
    target: escalationTarget,
    urgency: urgencyLevel,
    issue: detectedIssue,
    message: finalMessage,
    status: 'pending',
    method: 'whatsapp'
  };
  escalationHistory.unshift(escalation);

  window.open(`https://wa.me/${wa}?text=${encodeURIComponent(finalMessage)}`, '_blank');
  showEscalationCard(escalation);
  showModal('WhatsApp Opened', `WhatsApp chat dengan <strong>${escalationTarget}</strong> telah dibuka.`);
}

function callPIC() {
  const select = document.getElementById('escalationTarget');
  const escalationTarget = select.options[select.selectedIndex].text;
  const phone = select.options[select.selectedIndex].dataset.phone;

  const modal = document.createElement('div');
  modal.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 30px; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); z-index: 1000; max-width: 500px;';
  modal.innerHTML = `
    <h3 style="margin-bottom: 15px;"><i class="fa-solid fa-phone" style="color: #3b82f6;"></i> Call PIC</h3>
    <p style="margin-bottom: 10px;"><strong>Calling:</strong> ${escalationTarget}</p>
    <p style="margin-bottom: 20px; font-size: 1.5rem; font-weight: 700; color: #3b82f6;">${phone}</p>
    <div style="display: flex; gap: 10px;">
      <a href="tel:${phone}" class="btn-generate" style="flex: 1; text-align: center; text-decoration: none; background: #3b82f6; color: white;"><i class="fa-solid fa-phone"></i> Call Now</a>
      <button class="btn-generate" onclick="this.parentElement.parentElement.remove()" style="flex: 1; background: #6b7280; color: white;">Cancel</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function showEscalationCard(escalation) {
  document.getElementById('escalationTracking').style.display = 'block';
  const cardsContainer = document.getElementById('trackingCards');

  const card = document.createElement('div');
  card.className = `escalation-card status-${escalation.status}`;
  card.id = `esc-${escalation.id}`;
  card.innerHTML = `
    <div class="esc-header">
      <div class="esc-title">${escalation.target}</div>
      <div class="esc-status-badge status-${escalation.status}">${escalation.status.toUpperCase()}</div>
    </div>
    <div class="esc-issue">${escalation.issue}</div>
    <div class="esc-meta">
      <span><i class="fa-solid fa-clock"></i> ${escalation.timestamp.toLocaleTimeString('id-ID')}</span>
      <span><i class="fa-solid fa-bolt"></i> ${escalation.urgency}</span>
      <span><i class="fa-solid fa-paper-plane"></i> ${escalation.method}</span>
    </div>
    <div class="esc-actions">
      <button class="esc-btn" onclick="markAsResponded(${escalation.id})"><i class="fa-solid fa-reply"></i> Mark Responded</button>
      <button class="esc-btn" onclick="markAsDone(${escalation.id})" disabled><i class="fa-solid fa-check"></i> Mark Done</button>
    </div>
  `;

  cardsContainer.insertBefore(card, cardsContainer.firstChild);
}

function markAsResponded(id) {
  const escalation = escalationHistory.find(e => e.id === id);
  if (escalation && escalation.status === 'pending') {
    escalation.status = 'responded';
    updateEscalationCard(id);
  }
}

function markAsDone(id) {
  const escalation = escalationHistory.find(e => e.id === id);
  if (escalation && escalation.status === 'responded') {
    escalation.status = 'done';
    updateEscalationCard(id);
  }
}

function updateEscalationCard(id) {
  const escalation = escalationHistory.find(e => e.id === id);
  const card = document.getElementById(`esc-${id}`);

  if (card && escalation) {
    card.className = `escalation-card status-${escalation.status}`;
    card.querySelector('.esc-status-badge').className = `esc-status-badge status-${escalation.status}`;
    card.querySelector('.esc-status-badge').textContent = escalation.status.toUpperCase();

    const respondBtn = card.querySelector('.esc-actions button:nth-child(1)');
    const doneBtn = card.querySelector('.esc-actions button:nth-child(2)');

    respondBtn.disabled = escalation.status !== 'pending';
    doneBtn.disabled = escalation.status !== 'responded';
  }

  filterEscalations(currentFilter);
}

function filterEscalations(status) {
  currentFilter = status;

  document.querySelectorAll('.filter-status-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.status === status);
  });

  document.querySelectorAll('.escalation-card').forEach(card => {
    card.style.display = (status === 'all' || card.classList.contains(`status-${status}`)) ? 'block' : 'none';
  });
}

function generateEscalationMessage(issue, urgency) {
  const urgencyText = { 'immediate': 'SEGERA', 'high': 'PRIORITAS TINGGI', 'medium': 'PRIORITAS SEDANG', 'low': 'PRIORITAS RENDAH' };
  return `[${urgencyText[urgency]}] ESKALASI EARLY WARNING SYSTEM\n\nKepada Yth. PIC Terkait,\n\nKami mendeteksi isu yang memerlukan perhatian segera:\n\n📌 ISSUE: ${issue}\n\n🔍 DETAIL:\n- Terdeteksi melalui: Social Media Monitoring\n- Tingkat Viralitas: Tinggi\n- Potensi Dampak: Reputasi & Pelayanan Publik\n- Waktu Deteksi: ${new Date().toLocaleString('id-ID')}\n\n⚡ TINDAKAN YANG DIPERLUKAN:\n1. Review dan verifikasi informasi\n2. Koordinasi dengan tim terkait\n3. Siapkan statement/klarifikasi resmi\n4. Laporkan progress ke Command Center\n\nResponse time target: ${getResponseTime(urgency)}\n\nTerima kasih atas perhatian dan tindak lanjutnya.\n\n---\nSleman Smart Regency Command Center\nDiskominfo Kabupaten Sleman`;
}

function getResponseTime(urgency) {
  const times = { 'immediate': '15 menit', 'high': '30 menit', 'medium': '1 jam', 'low': '3 jam' };
  return times[urgency] || '1 jam';
}

function startEscalationTimer(escalation) {
  const responseTime = { 'immediate': 0.25, 'high': 0.5, 'medium': 1, 'low': 3 };
  const minutes = responseTime[escalation.urgency] || 1;

  setTimeout(() => {
    if (escalation.status === 'pending') {
      showOverdueAlert(escalation);
    }
  }, minutes * 60 * 1000);
}

function showOverdueAlert(escalation) {
  const alert = document.createElement('div');
  alert.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #fee2e2; padding: 20px; border-radius: 12px; border-left: 4px solid #dc2626; box-shadow: 0 10px 25px rgba(0,0,0,0.2); z-index: 2000; max-width: 400px; animation: slideIn 0.3s;';
  alert.innerHTML = `
    <h4 style="color: #dc2626; margin-bottom: 10px;"><i class="fa-solid fa-exclamation-triangle"></i> Escalation Overdue</h4>
    <p style="font-size: 0.9rem; margin-bottom: 10px;">No response from <strong>${escalation.target}</strong></p>
    <button class="btn-generate" onclick="reEscalate(${escalation.id}); this.parentElement.remove();" style="width: 100%; background: #dc2626; color: white; font-size: 0.9rem;">Re-escalate</button>
  `;
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 10000);
}

function reEscalate(escalationId) {
  const escalation = escalationHistory.find(e => e.id === escalationId);
  if (escalation) {
    document.getElementById('escalationTarget').value = 'sekda';
    document.getElementById('urgencyLevel').value = 'immediate';
    updateContactInfo();
    alert('Escalation upgraded to Sekda with IMMEDIATE priority');
  }
}

function viewEscalationHistory() {
  const modal = document.createElement('div');
  modal.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 30px; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); z-index: 1000; max-width: 800px; max-height: 80vh; overflow-y: auto;';

  let html = '<h3 style="margin-bottom: 20px;"><i class="fa-solid fa-history"></i> Escalation History</h3>';

  if (escalationHistory.length === 0) {
    html += '<p style="text-align: center; color: #64748b; padding: 40px;">No escalation history yet.</p>';
  } else {
    html += '<div style="display: flex; flex-direction: column; gap: 15px;">';
    escalationHistory.forEach(esc => {
      const statusColor = { 'pending': '#f59e0b', 'responded': '#3b82f6', 'done': '#16a34a' };
      html += `<div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid ${statusColor[esc.status]};"><div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><strong>${esc.target}</strong><span style="font-size: 0.85rem; color: #64748b;">${esc.timestamp.toLocaleString('id-ID')}</span></div><div style="font-size: 0.9rem; color: #64748b; margin-bottom: 8px;">${esc.issue}</div><div style="display: flex; gap: 10px; font-size: 0.8rem;"><span style="background: white; padding: 4px 8px; border-radius: 4px;">Urgency: ${esc.urgency}</span><span style="background: white; padding: 4px 8px; border-radius: 4px;">Via: ${esc.method}</span><span style="background: ${statusColor[esc.status]}; color: white; padding: 4px 8px; border-radius: 4px;">${esc.status}</span></div></div>`;
    });
    html += '</div>';
  }

  html += '<button class="btn-generate" onclick="this.parentElement.remove()" style="width: 100%; margin-top: 20px;">Close</button>';
  modal.innerHTML = html;
  document.body.appendChild(modal);
}

function showSuccessModal(target, email, urgency) {
  const modal = document.createElement('div');
  modal.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 30px; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); z-index: 1000; max-width: 600px;';
  modal.innerHTML = `<h3 style="margin-bottom: 15px;"><i class="fa-solid fa-check-circle text-success"></i> Escalation Sent Successfully</h3><div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 15px;"><p style="margin-bottom: 10px;"><strong>To:</strong> ${target}</p><p style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</p><p style="margin-bottom: 10px;"><strong>Urgency:</strong> ${urgency}</p></div><button class="btn-generate" onclick="this.parentElement.remove()" style="width: 100%;">OK</button>`;
  document.body.appendChild(modal);
}

function showModal(title, message) {
  const modal = document.createElement('div');
  modal.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 30px; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); z-index: 1000; max-width: 500px;';
  modal.innerHTML = `<h3 style="margin-bottom: 15px;">${title}</h3><p style="margin-bottom: 15px;">${message}</p><button class="btn-generate" onclick="this.parentElement.remove()" style="width: 100%; margin-top: 15px;">OK</button>`;
  document.body.appendChild(modal);
}
