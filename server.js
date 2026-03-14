require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id', 'x-api-key'],
}));
app.use(express.json());

// Statik frontend dosyalarını sun
app.use(express.static(__dirname));

// Ana sayfa için index.html gönder (Vercel Fix)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ─── Basit Bellek Tabanlı Kullanıcı Veritabanı ───────────────────────────────
// Gerçek projede MongoDB / PostgreSQL kullanın
const users = {
  'free-demo-user': {
    id: 'free-demo-user',
    plan: 'free',
    dailyUsage: 0,
    lastReset: new Date().toDateString(),
  },
  'premium-user-1': {
    id: 'premium-user-1',
    plan: 'premium',
    apiKey: 'PREMIUM-KEY-ABC123',
    dailyUsage: 0,
    lastReset: new Date().toDateString(),
  },
};

const FREE_DAILY_LIMIT = 3;

// ─── Yardımcı Fonksiyonlar ───────────────────────────────────────────────────
function getOrCreateUser(userId) {
  if (!users[userId]) {
    users[userId] = {
      id: userId,
      plan: 'free',
      dailyUsage: 0,
      lastReset: new Date().toDateString(),
    };
  }

  const user = users[userId];
  // Gün değiştiyse kullanımı sıfırla
  const today = new Date().toDateString();
  if (user.lastReset !== today) {
    user.dailyUsage = 0;
    user.lastReset = today;
  }
  return user;
}

function checkFreemiumLimit(user) {
  if (user.plan === 'premium') return { allowed: true };
  if (user.dailyUsage >= FREE_DAILY_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      message: `Günlük ücretsiz limitinize (${FREE_DAILY_LIMIT} ürün) ulaştınız. Sınırsız kullanım için 79 TL/ay'a abone olun.`,
    };
  }
  return {
    allowed: true,
    remaining: FREE_DAILY_LIMIT - user.dailyUsage,
  };
}

// ─── OpenRouter AI Çağrısı ───────────────────────────────────────────────────
// Ücretsiz modeller — birinde rate limit olursa sıradakini dener
const FREE_MODELS = [
  'google/gemma-3-4b-it:free',
  'google/gemma-3-12b-it:free',
  'liquid/lfm-2.5-1.2b-instruct:free',
  'arcee-ai/trinity-mini:free',
];

async function callAIWithModel(model, prompt) {
  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 900,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:3001',
        'X-Title': 'AI E-Ticaret Tool',
      },
      timeout: 30000,
    }
  );

  const raw = response.data.choices[0].message.content.trim();
  // Markdown kod bloğu varsa temizle
  const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('AI geçersiz format döndürdü: ' + cleaned.substring(0, 100));
  return JSON.parse(jsonMatch[0]);
}

async function callAI(productName, productFeatures, targetAudience = '', tone = '') {
  const prompt = `Sen profesyonel bir e-ticaret metin yazarı ve pazarlama stratejistisin. Aşağıdaki ürün bilgilerini kullanarak doğal, ikna edici ve kurumsal bir dille Türkçe içerik üret.
  
  Ürün: ${productName}
  ${productFeatures ? `Özellikler: ${productFeatures}` : ''}
  ${targetAudience ? `Hedef Kitle: ${targetAudience}` : ''}
  ${tone ? `Metin Tonu: ${tone}` : ''}

  İçerik kuralları:
  1. Hedef kitleye ve seçilen tona (örneğin ${tone}) tam uyum sağla.
  2. "Anahtar Özellikler" kısmında verilen kelimeleri metnin içine doğal bir şekilde yedir.
  3. Kesinlikle emoji kullanma. Kurumsal ve profesyonel bir dil kullan.
  
  Yanıtı SADECE şu JSON formatında döndür:
  {
    "description": "Ürünün değer önerisini vurgulayan, kapsamlı profesyonel açıklama.",
    "seoTitle": "SEO odaklı kurumsal başlık.",
    "instagramCaption": "Sosyal medya için etkileşim odaklı profesyonel metin.",
    "keywords": ["anahtar", "kelime", "listesi"]
  }`;

  let lastError;
  for (const model of FREE_MODELS) {
    try {
      const result = await callAIWithModel(model, prompt);
      return result;
    } catch (err) {
      lastError = err;
      console.warn(`[AI] Model ${model} failed, trying next...`);
    }
  }
  throw lastError;
}

// ─── Rate Limiter (IP başına dakikada 20 istek) ──────────────────────────────
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Çok fazla istek. Lütfen bir dakika bekleyin.' },
});
app.use('/api/', limiter);

// ─── ROUTES ──────────────────────────────────────────────────────────────────

// Sağlık kontrolü
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI E-Ticaret Tool API çalışıyor 🚀' });
});

// Kullanıcı durumu sorgula
app.get('/api/user/status', (req, res) => {
  const userId = req.headers['x-user-id'] || 'anonymous';
  const user = getOrCreateUser(userId);
  const limit = checkFreemiumLimit(user);

  res.json({
    plan: user.plan,
    dailyUsage: user.dailyUsage,
    dailyLimit: user.plan === 'premium' ? null : FREE_DAILY_LIMIT,
    remaining: limit.remaining ?? null,
  });
});

// Auth Endpoints
app.post('/api/auth/register', (req, res) => {
  try {
    const { businessName, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'E-posta ve şifre zorunludur.' });
    
    // Basit bir userId oluştur (Base64 email)
    const userId = `u-${Buffer.from(email).toString('base64').substring(0, 8)}`;
    
    if (!users[userId]) {
      users[userId] = {
        id: userId,
        email,
        businessName: businessName || 'My Business',
        plan: 'free',
        dailyUsage: 0,
        totalGenerated: 0,
        createdAt: new Date(),
        lastReset: new Date().toDateString()
      };
    }
    
    console.log(`[AUTH] Register: ${email}`);
    res.json({ success: true, user: users[userId] });
  } catch (err) {
    res.status(500).json({ error: 'Auth hatası: ' + err.message });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ error: 'E-posta zorunludur.' });
    
    const userId = `u-${Buffer.from(email).toString('base64').substring(0, 8)}`;
    
    if (!users[userId]) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı. Lütfen önce kayıt olun.' });
    }
    
    console.log(`[AUTH] Login: ${email}`);
    res.json({ success: true, user: users[userId] });
  } catch (err) {
    res.status(500).json({ error: 'Giriş hatası: ' + err.message });
  }
});

app.post('/api/generate', async (req, res) => {
  const userId = req.headers['x-user-id'] || `guest-${req.ip}`;
  const user = getOrCreateUser(userId);
  const limitCheck = checkFreemiumLimit(user);

  if (!limitCheck.allowed) {
    return res.status(429).json({ error: limitCheck.message });
  }

  try {
    const { productName, productFeatures, targetAudience, tone } = req.body;
    
    if (!productName || productName.trim().length < 2) {
      return res.status(400).json({ error: 'Geçerli bir ürün adı girin.' });
    }

      const rawResult = await callAI(
        productName.trim(), 
        productFeatures?.trim(),
        targetAudience?.trim(),
        tone?.trim()
      );

      // Clean properties safely
      const cleanData = {
        description: (rawResult.description || "İçerik üretilemedi.").replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim(),
        seoTitle: (rawResult.seoTitle || "Başlık üretilemedi.").replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim(),
        instagramCaption: (rawResult.instagramCaption || "Altyazı üretilemedi.").replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim(),
        keywords: rawResult.keywords || []
      };

    user.dailyUsage += 1;
    user.totalGenerated += 1;

    return res.json({
      success: true,
      data: cleanData,
      usage: {
        plan: user.plan,
        dailyUsage: user.dailyUsage,
        remaining: user.plan === 'premium' ? null : FREE_DAILY_LIMIT - user.dailyUsage,
      },
    });
  } catch (err) {
    console.error('AI API Hatası:', err.message);
    return res.status(500).json({ error: 'AI Hatası: ' + err.message });
  }
});

// Premium abonelik (örnek endpoint — gerçekte Stripe/İyzico entegre edilir)
app.post('/api/subscribe', (req, res) => {
  const { userId, email } = req.body;
  if (!userId || !email) {
    return res.status(400).json({ error: 'userId ve email zorunludur.' });
  }

  // Gerçek projede: ödeme işlemi → webhook → kullanıcıyı premium yap
  const user = getOrCreateUser(userId);
  user.plan = 'premium';

  res.json({
    success: true,
    message: 'Premium aboneliğiniz aktif edildi! 🎉',
    plan: 'premium',
  });
});

// ─── Sunucuyu Başlat ─────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚀 AI E-Ticaret Tool API çalışıyor: http://localhost:${PORT}`);
    console.log(`📋 Sağlık: http://localhost:${PORT}/api/health`);
    console.log(`\n⚠️  .env dosyasında OPENROUTER_API_KEY tanımlı olduğundan emin olun!\n`);
  });
}

module.exports = app;
