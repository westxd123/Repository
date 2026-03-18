require('dotenv').config();
const axios = require('axios');

async function testFull() {
  console.log('🛒 Gerçek ürün içeriği testi...\n');
  try {
    const res = await axios.post('http://localhost:3001/api/generate', {
      productName: 'Nike Air Max 270',
      productCategory: 'Spor & Outdoor'
    }, {
      headers: { 'Content-Type': 'application/json', 'x-user-id': 'test-user' }
    });

    console.log('✅ BAŞARILI!\n');
    const d = res.data.data;
    console.log('📄 Açıklama:\n', d.description, '\n');
    console.log('🔍 SEO Başlık:', d.seoTitle, '\n');
    console.log('📸 Instagram:\n', d.instagram, '\n');
    console.log('🎵 TikTok:\n', d.tiktok, '\n');
    console.log('💼 LinkedIn:\n', d.linkedin, '\n');
    console.log('🐦 Twitter (X):\n', d.twitter, '\n');
    console.log('🏷️  Keywords:', d.keywords?.join(', '));
    console.log('\n📊 Kullanım:', res.data.usage);
  } catch(e) {
    console.error('❌ HATA:', e.response?.data || e.message);
  }
}
testFull();
