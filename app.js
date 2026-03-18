/* 
   Prodify - High Fidelity Engine v2.0
   Emerald Edition - Precision Logic + i18n
*/

const CONFIG = { API_BASE: window.location.origin };

// ─── AUTH ──────────────────────────────────────────────────────────────────
const Auth = {
  setSession: (userData) => {
    const session = { user: userData, expiry: Date.now() + (24 * 60 * 60 * 1000) };
    localStorage.setItem('yazai_session', JSON.stringify(session));
    window.location.href = '/';
  },
  getSession: () => {
    const session = localStorage.getItem('yazai_session');
    if (!session) return null;
    const data = JSON.parse(session);
    if (Date.now() > data.expiry) { localStorage.removeItem('yazai_session'); return null; }
    return data.user;
  },
  logout: () => { localStorage.removeItem('yazai_session'); window.location.href = '/'; }
};

// ─── TOAST ─────────────────────────────────────────────────────────────────
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
  toast.style.cssText = `pointer-events:all;display:flex;align-items:center;gap:12px;padding:14px 20px;border-radius:16px;font-size:13px;font-weight:600;min-width:260px;max-width:400px;box-shadow:0 20px 40px rgba(0,0,0,0.5);backdrop-filter:blur(20px);color:white;font-family:'Inter',sans-serif;opacity:0;transform:translateY(16px);transition:all 0.4s cubic-bezier(0.19,1,0.22,1);${colors[type] || colors.info}`;
  toast.innerHTML = `${icons[type] || icons.info}<span>${message}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => { toast.style.opacity = '1'; toast.style.transform = 'translateY(0)'; }));
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(16px)'; setTimeout(() => toast.remove(), 400); }, 4000);
}

// ─── I18N ──────────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    'nav.ai-engine': 'AI Engine', 'nav.solutions': 'Solutions', 'nav.infrastructure': 'Infrastructure',
    'nav.authenticate': 'Authenticate', 'nav.initialize': 'Initialize',
    'nav.workspace-node': 'Workspace Node', 'nav.dashboard': 'Dashboard',
    'nav.tier': 'TIER', 'nav.logout': 'Terminate Exit', 'nav.prodify-id': 'Prodify ID',
    'hero.badge': 'System initialized // PRODIFY v2',
    'hero.title-line1': 'Unified', 'hero.title-line2': 'Intelligence.',
    'hero.desc': 'Scale content creation with corporate intelligence. <span class="text-brand-accent italic">Prodify</span> Engine generates high-impact copies in seconds.',
    'hero.cta': 'Launch Operation', 'hero.teams': '+1k Teams', 'hero.teams-sub': 'Using Intelligence',
    'marquee.label': 'Global E-Commerce Integration Nodes',
    'tool.badge': 'Neural Workspace / Precision_Mode', 'tool.status': 'Operation Ready',
    'tool.product-name': 'Product Name', 'tool.product-name-ph': 'Enter product name...',
    'tool.features': 'Details & Features', 'tool.features-ph': 'Fast, durable, economical...',
    'tool.audience': 'Target Audience', 'tool.audience-ph': 'Young adults, etc.',
    'tool.category': 'Product Category',
    'tool.tone': 'Content Tone', 'tool.tone-professional': 'Professional',
    'tool.tone-exciting': 'Exciting', 'tool.tone-luxury': 'Luxury / Premium', 'tool.tone-sincere': 'Sincere',
    'tool.btn': 'Execute Process', 'tool.awaiting': 'Awaiting Instruction',
    'tool.processing': 'Neural Reconstruction...', 'tool.output': 'Output Sequence',
    'tool.seo': 'SEO Meta Host', 'tool.social': 'Social Protocol', 'tool.copy': 'Copy',
    'pricing.title': 'Capital.', 'pricing.subtitle': "Don't limit your growth.",
    'pricing.starter-tag': 'Core / 01', 'pricing.starter-name': 'Starter',
    'pricing.starter-f1': '· 3 AI Generations / Day', 'pricing.starter-f2': '· Product Description Writing',
    'pricing.starter-f3': '· Basic SEO Title Generator', 'pricing.starter-f4': '· Instagram Caption Generator',
    'pricing.starter-f5': '· Analytics Dashboard (Locked)',
    'pricing.starter-btn': 'Join Network', 'pricing.pro-tag': 'Full Access', 'pricing.pro-badge': 'Neural / 02',
    'pricing.pro-cancel': '~$2.20 USD · Cancel anytime',
    'pricing.pro-f1': 'Unlimited AI Generations', 'pricing.pro-f2': 'Advanced SEO Optimization',
    'pricing.pro-f3': 'Multi-Platform Captions', 'pricing.pro-f4': 'All 4 Content Tones',
    'pricing.pro-f5': 'Priority Processing', 'pricing.pro-f6': 'Analytics Dashboard',
    'pricing.pro-btn': 'Initialize Pro', 'pricing.elite-tag': 'Elite / 03', 'pricing.elite-name': 'Elite',
    'pricing.elite-f1': '· Everything in Pro', 'pricing.elite-f2': '· Full API Access & Webhooks',
    'pricing.elite-f3': '· Custom AI Model Training', 'pricing.elite-f4': '· Dedicated Account Manager',
    'pricing.elite-f5': '· White-Label Option',
    'pricing.elite-btn': 'Contact Elite',
    'cta.title': 'Future of Commerce <br/> starts here.', 'cta.btn': 'Claim Your Workspace',
    'stats.generated': 'Products Generated', 'stats.merchants': 'Active Merchants',
    'stats.models': 'AI Models Active', 'stats.satisfaction': 'Satisfaction Rate',
    'how.badge': 'Process // 3 Steps', 'how.title': 'How It Works.',
    'how.subtitle': 'Three steps to enterprise-grade content, generated in seconds.',
    'how.step1-title': 'Input Product Data', 'how.step1-desc': 'Enter your product name, key features, target audience, and preferred content tone. The neural engine processes your input in real time.',
    'how.step2-title': 'AI Processing', 'how.step2-desc': 'Our neural engine analyzes your input across multiple AI models, selecting the best output — high-converting, professional, and platform-optimized.',
    'how.step3-title': 'Copy & Deploy', 'how.step3-desc': 'Receive your product description, SEO title, and social media caption. One click to copy and deploy across Trendyol, Hepsiburada, Amazon, or Instagram.',
    'feat.title': 'Why Prodify?', 'feat.subtitle': 'Every feature engineered for commerce at scale.',
    'feat.f1-title': 'Lightning Fast', 'feat.f1-desc': 'Content generated in under 3 seconds. Multi-model fallback ensures 99.9% uptime even during AI provider outages.',
    'feat.f2-title': 'SEO-Optimized', 'feat.f2-desc': 'AI-crafted titles built around e-commerce search patterns. Your products rank higher on Trendyol, Amazon, and Hepsiburada searches.',
    'feat.f3-title': 'Multi-Platform', 'feat.f3-desc': 'One product entry, three outputs: marketplace description, SEO meta title, and Instagram-ready caption. Zero extra effort.',
    'feat.f4-title': 'Emoji-Free Output', 'feat.f4-desc': 'Enterprise-grade, clean corporate copy. No filler emojis or fluff — pure professional language that builds brand trust.',
    'feat.f5-title': '4 Content Tones', 'feat.f5-desc': 'Choose from Professional, Exciting, Luxury, or Sincere tones. The AI adapts its language to perfectly match your brand voice.',
    'feat.f6-title': 'Turkish Market Focus', 'feat.f6-desc': 'Trained on Turkish e-commerce patterns. Understands local buyer psychology, platform conventions, and high-converting keyword structures.',
    'footer.mission': 'Our mission is to bridge the gap between human creativity and sovereign intelligence. Prodify provides the neural infrastructure for next-generation commerce.',
    'footer.logistics': 'Logistics', 'footer.workspace-link': 'Neural Workspace',
    'footer.api': 'API Protocol', 'footer.core': 'Core Systems', 'footer.governance': 'Governance',
    'footer.terms': 'Service Terms', 'footer.privacy': 'Privacy Node', 'footer.legal': 'Legal Specs',
    'footer.status': 'Global Infrastructure // Secure Access',
    'footer.system-status': 'System Status: Optimal', 'footer.version': 'Version: 2.1.0_emerald',
    'auth.title-login': 'Access Workspace', 'auth.subtitle-login': 'Initialize Security Protocol',
    'auth.btn-login': 'Authorize Access',
    'auth.toggle-login': 'New Workspace? <span class="text-white underline underline-offset-4">Initialize One</span>',
    'auth.title-register': 'Global Register', 'auth.subtitle-register': 'Create New Operational Node',
    'auth.btn-register': 'Initialize Workspace',
    'auth.toggle-register': 'Have a Workspace? <span class="text-white underline underline-offset-4">Authenticate</span>',
    'auth.org-label': 'Organization Identity', 'auth.org-ph': 'Business Name',
    'auth.email-label': 'Authorized Email', 'auth.email-ph': 'name@company.com',
    'auth.pass-label': 'Secret Key', 'auth.return': 'Return to Headquarters',
    'profile.logout': 'Logout System', 'profile.goto': 'Go to Dashboard',
    'profile.node': 'Node Intelligence', 'profile.auth-node': 'Auth Node',
    'profile.plan': 'Plan Spectrum', 'profile.efficiency': 'Efficiency_Rate',
    'profile.daily': 'Daily Success Cycles', 'profile.integrated': 'Integrated_Output',
    'profile.cumulative': 'Cumulative Intelligence', 'profile.operational': 'Operational Mode',
    'profile.role': 'Enterprise Engine',
  },
  tr: {
    'nav.ai-engine': 'AI Motoru', 'nav.solutions': 'Çözümler', 'nav.infrastructure': 'Altyapı',
    'nav.authenticate': 'Giriş Yap', 'nav.initialize': 'Başla',
    'nav.workspace-node': 'Çalışma Düğümü', 'nav.dashboard': 'Panel',
    'nav.tier': 'PLAN', 'nav.logout': 'Çıkış Yap', 'nav.prodify-id': 'Prodify Kimlik',
    'hero.badge': 'Sistem başlatıldı // PRODIFY v2',
    'hero.title-line1': 'Birleşik', 'hero.title-line2': 'Zeka.',
    'hero.desc': 'İçerik üretimini kurumsal zeka ile ölçeklendirin. <span class="text-brand-accent italic">Prodify</span> Engine saniyeler içinde yüksek etkili kopyalar oluşturur.',
    'hero.cta': 'Operasyonu Başlat', 'hero.teams': '+1k Ekip', 'hero.teams-sub': 'Zekayı Kullanıyor',
    'marquee.label': 'Global E-Ticaret Entegrasyon Noktaları',
    'tool.badge': 'Nöral Çalışma Alanı / Hassasiyet_Modu', 'tool.status': 'Operasyon Hazır',
    'tool.product-name': 'Ürün Adı', 'tool.product-name-ph': 'Ürün adını girin...',
    'tool.features': 'Detaylar & Özellikler', 'tool.features-ph': 'Hızlı, dayanıklı, ekonomik...',
    'tool.audience': 'Hedef Kitle', 'tool.audience-ph': 'Gençler vb.',
    'tool.category': 'Ürün Kategorisi',
    'tool.tone': 'Metin Tonu', 'tool.tone-professional': 'Profesyonel',
    'tool.tone-exciting': 'Heyecanlı', 'tool.tone-luxury': 'Lüks / Premium', 'tool.tone-sincere': 'Samimi',
    'tool.btn': 'İşlemi Yürüt', 'tool.awaiting': 'Komut Bekleniyor',
    'tool.processing': 'Nöral Yeniden Yapılandırma...', 'tool.output': 'Çıktı Dizisi',
    'tool.seo': 'SEO Meta Sunucusu', 'tool.social': 'Sosyal Protokol', 'tool.copy': 'Kopyala',
    'pricing.title': 'Sermaye.', 'pricing.subtitle': 'Büyümenizi kısıtlamayın.',
    'pricing.starter-tag': 'Temel / 01', 'pricing.starter-name': 'Başlangıç',
    'pricing.starter-f1': '· Günlük 3 AI Üretimi', 'pricing.starter-f2': '· Ürün Açıklaması Yazımı',
    'pricing.starter-f3': '· Temel SEO Başlığı Üretici', 'pricing.starter-f4': '· Instagram Altyazı Üretici',
    'pricing.starter-f5': '· Analitik Paneli (Kilitli)',
    'pricing.starter-btn': 'Ağa Katıl', 'pricing.pro-tag': 'Tam Erişim', 'pricing.pro-badge': 'Nöral / 02',
    'pricing.pro-cancel': '~$2.20 USD · İstediğinizde iptal',
    'pricing.pro-f1': 'Sınırsız AI Üretimi', 'pricing.pro-f2': 'Gelişmiş SEO Optimizasyonu',
    'pricing.pro-f3': 'Çok Platformlu Altyazılar', 'pricing.pro-f4': 'Tüm 4 İçerik Tonu',
    'pricing.pro-f5': 'Öncelikli İşleme', 'pricing.pro-f6': 'Analitik Paneli',
    'pricing.pro-btn': "Pro'yu Başlat", 'pricing.elite-tag': 'Elit / 03', 'pricing.elite-name': 'Elit',
    'pricing.elite-f1': '· Pro\'daki Her Şey', 'pricing.elite-f2': '· Tam API Erişimi & Webhook',
    'pricing.elite-f3': '· Özel AI Model Eğitimi', 'pricing.elite-f4': '· Özel Hesap Yöneticisi',
    'pricing.elite-f5': '· White-Label Seçeneği',
    'pricing.elite-btn': 'Elit İletişim',
    'cta.title': 'Ticaretin geleceği <br/> burada başlıyor.', 'cta.btn': 'Çalışma Alanı Talep Et',
    'stats.generated': 'Üretilen Ürün', 'stats.merchants': 'Aktif Satıcı',
    'stats.models': 'Aktif AI Modeli', 'stats.satisfaction': 'Memnuniyet Oranı',
    'how.badge': 'Süreç // 3 Adım', 'how.title': 'Nasıl Çalışır?',
    'how.subtitle': 'Saniyeler içinde kurumsal düzeyde içerik için üç adım.',
    'how.step1-title': 'Ürün Verisi Gir', 'how.step1-desc': 'Ürün adını, temel özelliklerini, hedef kitlenizi ve tercih ettiğiniz içerik tonunu girin. Nöral motor girdilerinizi gerçek zamanlı olarak işler.',
    'how.step2-title': 'AI İşleme', 'how.step2-desc': 'Nöral motorumuz, girdilerinizi birden fazla AI modeli üzerinden analiz ederek en iyi çıktıyı seçer: yüksek dönüşüm, profesyonel ve platform optimize.',
    'how.step3-title': 'Kopyala & Yayınla', 'how.step3-desc': 'Ürün açıklaması, SEO başlığı ve sosyal medya altyazısını alın. Tek tıkla kopyalayıp Trendyol, Hepsiburada, Amazon veya Instagram\'a yayınlayın.',
    'feat.title': 'Neden Prodify?', 'feat.subtitle': 'Her özellik büyük ölçekli ticaret için tasarlandı.',
    'feat.f1-title': 'Yıldırım Hızlı', 'feat.f1-desc': 'İçerik 3 saniyenin altında üretilir. Çoklu model yedeklemesi, AI sağlayıcı kesintilerinde bile %99.9 çalışma süresini sağlar.',
    'feat.f2-title': 'SEO Optimize', 'feat.f2-desc': 'E-ticaret arama kalıpları üzerine inşa edilmiş AI tarafından oluşturulan başlıklar. Ürünleriniz Trendyol, Amazon ve Hepsiburada aramalarında daha üst sıralarda yer alır.',
    'feat.f3-title': 'Çok Platform', 'feat.f3-desc': 'Tek ürün girdi, üç çıktı: pazar yeri açıklaması, SEO meta başlığı ve Instagram\'a hazır altyazı. Sıfır ekstra çaba.',
    'feat.f4-title': 'Emojisiz Çıktı', 'feat.f4-desc': 'Kurumsal kalitede, temiz kurumsal kopya. Dolgu emojileri yok — marka güvenini inşa eden saf profesyonel dil.',
    'feat.f5-title': '4 İçerik Tonu', 'feat.f5-desc': 'Profesyonel, Heyecanlı, Lüks veya Samimi tonlar arasından seçin. AI, dilini marka sesinize mükemmel uyum sağlamak için uyarlar.',
    'feat.f6-title': 'Türk Pazar Odaklı', 'feat.f6-desc': 'Türk e-ticaret kalıpları üzerine eğitilmiş. Yerel alıcı psikolojisini, platform konvansiyonlarını ve yüksek dönüşüm sağlayan anahtar kelime yapılarını anlar.',
    'footer.mission': 'Misyonumuz insan yaratıcılığı ile egemen zeka arasındaki uçurumu kapatmaktır. Prodify, yeni nesil ticaret için nöral altyapıyı sunar.',
    'footer.logistics': 'Lojistik', 'footer.workspace-link': 'Nöral Çalışma Alanı',
    'footer.api': 'API Protokolü', 'footer.core': 'Temel Sistemler', 'footer.governance': 'Yönetişim',
    'footer.terms': 'Hizmet Koşulları', 'footer.privacy': 'Gizlilik Düğümü', 'footer.legal': 'Hukuki Özellikler',
    'footer.status': 'Global Altyapı // Güvenli Erişim',
    'footer.system-status': 'Sistem Durumu: Optimal', 'footer.version': 'Sürüm: 2.1.0_emerald',
    'auth.title-login': 'Çalışma Alanına Giriş', 'auth.subtitle-login': 'Güvenlik Protokolünü Başlat',
    'auth.btn-login': 'Erişimi Yetkilendir',
    'auth.toggle-login': 'Yeni Çalışma Alanı? <span class="text-white underline underline-offset-4">Oluştur</span>',
    'auth.title-register': 'Kayıt Ol', 'auth.subtitle-register': 'Yeni Operasyonel Düğüm Oluştur',
    'auth.btn-register': 'Çalışma Alanını Başlat',
    'auth.toggle-register': 'Hesabınız var mı? <span class="text-white underline underline-offset-4">Giriş Yap</span>',
    'auth.org-label': 'Organizasyon Kimliği', 'auth.org-ph': 'İşletme Adı',
    'auth.email-label': 'Yetkili E-posta', 'auth.email-ph': 'isim@sirket.com',
    'auth.pass-label': 'Gizli Anahtar', 'auth.return': 'Ana Sayfaya Dön',
    'profile.logout': 'Çıkış Yap', 'profile.goto': 'Panele Git',
    'profile.node': 'Düğüm Bilgisi', 'profile.auth-node': 'Kimlik Düğümü',
    'profile.plan': 'Plan Spektrumu', 'profile.efficiency': 'Verimlilik_Oranı',
    'profile.daily': 'Günlük Başarı Döngüleri', 'profile.integrated': 'Entegre_Çıktı',
    'profile.cumulative': 'Kümülatif Zeka', 'profile.operational': 'Operasyonel Mod',
    'profile.role': 'Kurumsal Motor',
  }
};

function applyTranslations(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });
}

function setLanguage(lang) {
  localStorage.setItem('prodify_lang', lang);
  applyTranslations(lang);
  updateLangButtons(lang);
}

function updateLangButtons(lang) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive = btn.dataset.lang === lang;
    btn.style.background = isActive ? 'rgba(16,185,129,0.15)' : 'transparent';
    btn.style.color = isActive ? '#10b981' : 'rgba(107,114,128,1)';
    btn.style.borderRadius = '999px';
  });
}

// ─── MOTION ────────────────────────────────────────────────────────────────
function initMotionEffects() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── DOM READY ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved language (default: en)
  const savedLang = localStorage.getItem('prodify_lang') || 'en';
  applyTranslations(savedLang);
  updateLangButtons(savedLang);

  const user = Auth.getSession();
  initMotionEffects();

  if (user) {
    const guestNav = document.getElementById('guest-nav');
    const userNav = document.getElementById('user-nav');
    if (guestNav) guestNav.classList.add('hidden');
    if (userNav) {
      userNav.classList.remove('hidden');
      const bname = document.getElementById('profile-business-name');
      const memail = document.getElementById('modal-email');
      const mplan = document.getElementById('modal-plan');
      if (bname) bname.textContent = user.businessName.toUpperCase();
      if (memail) memail.textContent = user.email;
      if (mplan) mplan.textContent = user.plan.toUpperCase();
    }
  }
});

function toggleDropdown(id) {
  const drop = document.getElementById(id);
  drop.classList.toggle('hidden');
}

function purchasePlan(planId) {
  if (!Auth.getSession()) {
    window.location.href = 'auth.html?mode=register';
  } else {
    window.location.href = 'checkout.html?plan=' + planId;
  }
}

// ─── AI ENGINE ─────────────────────────────────────────────────────────────
async function generateContent() {
  const user = Auth.getSession();
  if (!user) { window.location.href = 'auth.html'; return; }

  const lang = localStorage.getItem('prodify_lang') || 'en';
  const name = document.getElementById('product-name').value.trim();
  const features = document.getElementById('product-features').value.trim();
  const audience = document.getElementById('target-audience').value.trim();
  const category = document.getElementById('product-category').value;
  const tone = document.getElementById('content-tone').value;

  if (!name) {
    showToast(lang === 'tr' ? 'Ürün adı gereklidir.' : 'Product name is required.', 'error');
    return;
  }

  const btn = document.getElementById('generate-btn');
  const placeholder = document.getElementById('placeholder-ui');
  const loading = document.getElementById('loading-ui');
  const results = document.getElementById('results-display');

  btn.disabled = true;
  btn.style.opacity = '0.5';
  placeholder.classList.add('hidden');
  loading.classList.remove('hidden');
  results.classList.add('hidden');

  try {
    const response = await fetch(`${CONFIG.API_BASE}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-id': user.id },
      body: JSON.stringify({ productName: name, productFeatures: features, targetAudience: audience, productCategory: category, tone })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error);

    renderContent(result.data);
    showToast(lang === 'tr' ? 'İçerik başarıyla üretildi!' : 'Content generated successfully!', 'success');
    if (document.getElementById('usage-info')) {
      document.getElementById('usage-info').textContent = `Quota: ${result.usage.remaining}`;
    }
  } catch (err) {
    showToast(err.message || (lang === 'tr' ? 'Bir hata oluştu.' : 'An error occurred.'), 'error');
  } finally {
    btn.disabled = false;
    btn.style.opacity = '1';
    loading.classList.add('hidden');
  }
}

let currentResults = null;

function renderContent(data) {
  currentResults = data;
  document.getElementById('desc-text').textContent = data.description;
  document.getElementById('seo-text').textContent = data.seoTitle;
  switchPlatform('instagram');
  document.getElementById('results-display').classList.remove('hidden');
}

function switchPlatform(platform) {
  if (!currentResults) return;
  
  // Update UI tabs
  document.querySelectorAll('.platform-tab').forEach(btn => {
    const isTarget = btn.getAttribute('onclick').includes(platform);
    btn.classList.toggle('active', isTarget);
    btn.classList.toggle('text-gray-500', !isTarget);
  });

  // Update title and content
  const titles = {
    instagram: 'INSTAGRAM PROTOCOL',
    tiktok: 'TIKTOK STRATEGY',
    linkedin: 'LINKEDIN PROFESSIONAL',
    twitter: 'TWITTER (X) BROADCAST'
  };
  
  document.getElementById('platform-title').textContent = titles[platform];
  document.getElementById('social-text').textContent = currentResults[platform] || currentResults.instagramCaption || 'Content not generated.';
}

async function copyToClipboard(id, btn) {
  const lang = localStorage.getItem('prodify_lang') || 'en';
  const text = document.getElementById(id).textContent;
  try {
    await navigator.clipboard.writeText(text);
    showToast(lang === 'tr' ? 'Panoya kopyalandı!' : 'Copied to clipboard!', 'success');
    const originalText = btn.textContent;
    btn.textContent = 'COPIED!';
    btn.classList.add('text-brand-accent');
    setTimeout(() => { btn.textContent = originalText; btn.classList.remove('text-brand-accent'); }, 2000);
  } catch (err) {
    showToast(lang === 'tr' ? 'Kopyalama başarısız.' : 'Copy failed.', 'error');
  }
}
