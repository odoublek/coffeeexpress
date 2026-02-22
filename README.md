# Coffee Express Website

## Kurulum Talimatları

### 1. Node.js İndir
👉 https://nodejs.org adresine git → "LTS" versiyonu indir ve kur.

### 2. Projeyi Çalıştır
Terminali aç (VS Code'da Terminal > New Terminal):

```
npm install
npm start
```

Tarayıcı otomatik açılır: http://localhost:3000

### 3. Değiştirmek İstediklerini Düzenle
- **src/App.js** → Tüm içerik burada
- WhatsApp numarası: `WHATSAPP_NUMBER` değişkeni (satır 8)
- Şubeler: `BRANCHES` array'i
- Menü: `MENU_ITEMS` array'i
- Renkler: CSS içindeki `:root` bölümü

### Klasör Yapısı
```
coffee-express/
├── public/
│   └── index.html
├── src/
│   ├── App.js      ← Ana sayfa kodu
│   └── index.js    ← Giriş noktası
├── package.json
└── README.md
```
