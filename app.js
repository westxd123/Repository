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

function purchasePlan(planId) {
  if (!Auth.getSession()) {
    window.location.href = 'auth.html?mode=register';
  } else {
    window.location.href = 'checkout.html';
  }
}

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
    alert("Ürün adı gereklidir.");
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
    if(document.getElementById('usage-info')) {
      document.getElementById('usage-info').textContent = `Quota: ${result.usage.remaining}`;
    }
    
  } catch (err) {
    alert(err.message);
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
    const originalText = btn.textContent;
    btn.textContent = "COPIED!";
    btn.classList.add('text-brand-accent');
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove('text-brand-accent');
    }, 2000);
  } catch (err) {
    console.error('Copy failed', err);
  }
}
