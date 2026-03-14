# ⚡ YazAI – AI E-Ticaret İçerik Üreteci

Bu proje, e-ticaret satıcıları için yapay zeka destekli ürün açıklaması, SEO başlığı ve Instagram gönderisi üreten modern bir "SaaS" taslağıdır.

## 🌟 Özellikler

-   **Frontend:** HTML5, Tailwind CSS, Modern JavaScript
-   **Backend:** Node.js, Express.js
-   **AI Entegrasyonu:** OpenRouter (Çoklu model desteği ve otomatik retry)
-   **Freemium Modeli:** Günde 3 ürün ücretsiz, sınırsız premium seçenek.
-   **Premium Yönetimi:** Basit backend mantığı ve abone olma simülasyonu.
-   **UI/UX:** Glassmorphism tasarımı, karanlık mod, animasyonlu geçişler.

## 🚀 Hızlı Başlangıç

1.  **Bağımlılıkları Yükle:**
    ```bash
    npm install
    ```

2.  **API Anahtarını Ayarla:**
    `.env` dosyasını aç ve `OPENROUTER_API_KEY` kısmına kendi anahtarını yapıştır.
    *(Ücretsiz anahtar almak için: [openrouter.ai](https://openrouter.ai))*

3.  **Çalıştır:**
    ```bash
    node server.js
    ```
    Site şu adreste hazır olacak: `http://localhost:3001`

## 📁 Proje Klasörleri

-   `server.js`: API endpoint'leri ve AI mantığı.
-   `index.html`: Ana sayfa yapısı.
-   `style.css`: Modern tasarım ve animasyonlar.
-   `app.js`: Tarayıcı tarafı mantığı ve API bağlantısı.
-   `hero-image.png`: AI tarafından üretilmiş kapak görseli.

## 🛠️ Özelleştirme

-   **Ücretsiz Limit:** `server.js` içindeki `FREE_DAILY_LIMIT` değişkenini değiştirin.
-   **Modeller:** `FREE_MODELS` dizisindeki modelleri OpenRouter'daki diğer modellerle güncelleyebilirsiniz.
-   **Fiyatlandırma:** `index.html` içindeki fiyatları ve özellikleri kendinize göre düzenleyin.

---
*Bu proje Antigravity AI tarafından profesyonel bir SaaS taslağı olarak üretilmiştir.*
