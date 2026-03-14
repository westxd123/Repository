/* 
   Prodify - High Fidelity Engine v2.0
   Emerald Edition - Precision Logic
*/

const CONFIG = {
  API_BASE: window.location.origin
};

const Auth = {
  setSession: (userData) => {
    const session = {
      user: userData,
      expiry: Date.now() + (24 * 60 * 60 * 1000)
    };
    localStorage.setItem('yazai_session', JSON.stringify(session));
    window.location.href = '/';
  },
  getSession: () => {
    const session = localStorage.getItem('yazai_session');
    if (!session) return null;
    const data = JSON.parse(session);
    if (Date.now() > data.expiry) {
      localStorage.removeItem('yazai_session');
      return null;
    }
    return data.user;
  },
  logout: () => {
    localStorage.removeItem('yazai_session');
    window.location.href = '/';
  }
};

// --- MODERN TOAST NOTIFICATION SYSTEM ---
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position:fixed;bottom:32px;right:32px;z-index:9999;display:flex;flex-direction:column;gap:12px;pointer-events:none;';
    document.body.appendChild(container);
  }

  const icons = {
    success: '<svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>',
    error:   '<svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>',
    info:    '<svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>'
  };

  const colors = {
    success: 'background:rgba(16,185,129,0.92);border:1px solid rgba(52,211,153,0.3);',
    error:   'background:rgba(220,38,38,0.92);border:1px solid rgba(248,113,113,0.3);',
    info:    'background:rgba(6,78,59,0.95);border:1px solid rgba(16,185,129,0.2);'
  };

  const toast = document.createElement('div');
  toast.style.cssText = `
    pointer-events:all;
    display:flex;align-items:center;gap:12px;
    padding:14px 20px;border-radius:16px;
    font-size:13px;font-weight:600;
    min-width:260px;max-width:400px;
    box-shadow:0 20px 40px rgba(0,0,0,0.5);
    backdrop-filter:blur(20px);
    color:white;
    font-family:'Inter',sans-serif;
    opacity:0;transform:translateY(16px);
    transition:all 0.4s cubic-bezier(0.19,1,0.22,1);
    ${colors[type] || colors.info}
  `;
  toast.innerHTML = `${icons[type] || icons.info}<span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(16px)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// --- PLAN PURCHASE ---
function purchasePlan(planId) {
  if (!Auth.getSession()) {
    window.location.href = 'auth.html?mode=register';
  } else {
    window.location.href = 'checkout.html';
  }
}

// --- MOTION EFFECTS ---
function initMotionEffects() {
  const options = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, options);
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  const user = Auth.getSession();
  initMotionEffects();
  
  if (user) {
    const guestNav = document.getElementById('guest-nav');
    const userNav = document.getElementById('user-nav');
    if (guestNav) guestNav.classList.add('hidden');
    if (userNav) {
      userNav.classList.remove('hidden');
      document.getElementById('profile-business-name').textContent = user.businessName.toUpperCase();
      document.getElementById('modal-email').textContent = user.email;
      document.getElementById('modal-plan').textContent = user.plan.toUpperCase();
    }
  }
});

function toggleDropdown(id) {
  const drop = document.getElementById(id);
  drop.classList.toggle('hidden');
}

// --- CORE AI ENGINE ---
async function generateContent() {
  const user = Auth.getSession();
  if (!user) { window.location.href = 'auth.html'; return; }

  const name = document.getElementById('product-name').value.trim();
  const features = document.getElementById('product-features').value.trim();
  const audience = document.getElementById('target-audience').value.trim();
  const tone = document.getElementById('content-tone').value;

  if (!name) {
    showToast('Ürün adı gereklidir.', 'error');
    return;
  }

  const btn = document.getElementById('generate-btn');
  const placeholder = document.getElementById('placeholder-ui');
  const loading = document.getElementById('loading-ui');
  const results = document.getElementById('results-display');

  // UI Processing
  btn.disabled = true;
  btn.style.opacity = '0.5';
  placeholder.classList.add('hidden');
  loading.classList.remove('hidden');
  results.classList.add('hidden');

  try {
    const response = await fetch(`${CONFIG.API_BASE}/api/generate`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-user-id': user.id
      },
      body: JSON.stringify({ 
        productName: name, 
        productFeatures: features,
        targetAudience: audience,
        tone: tone
      })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error);

    renderContent(result.data);
    showToast('İçerik başarıyla üretildi!', 'success');
    if(document.getElementById('usage-info')) {
      document.getElementById('usage-info').textContent = `Quota: ${result.usage.remaining}`;
    }
    
  } catch (err) {
    showToast(err.message || 'Bir hata oluştu.', 'error');
  } finally {
    btn.disabled = false;
    btn.style.opacity = '1';
    loading.classList.add('hidden');
  }
}

function renderContent(data) {
  document.getElementById('desc-text').textContent = data.description;
  document.getElementById('seo-text').textContent = data.seoTitle;
  document.getElementById('social-text').textContent = data.instagramCaption;
  document.getElementById('results-display').classList.remove('hidden');
}

async function copyToClipboard(id, btn) {
  const text = document.getElementById(id).textContent;
  try {
    await navigator.clipboard.writeText(text);
    showToast('Panoya kopyalandı!', 'success');
    const originalText = btn.textContent;
    btn.textContent = 'COPIED!';
    btn.classList.add('text-brand-accent');
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove('text-brand-accent');
    }, 2000);
  } catch (err) {
    showToast('Kopyalama başarısız oldu.', 'error');
    console.error('Copy failed', err);
  }
}
