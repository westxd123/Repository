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
    console.log('📄 Açıklama:\n', res.data.data.description, '\n');
    console.log('🔍 SEO Başlık:', res.data.data.seoTitle, '\n');
    console.log('📸 Instagram:\n', res.data.data.instagramCaption, '\n');
    console.log('🏷️  Keywords:', res.data.data.keywords?.join(', '));
    console.log('\n📊 Kullanım:', res.data.usage);
  } catch(e) {
    console.error('❌ HATA:', e.response?.data || e.message);
  }
}
testFull();
