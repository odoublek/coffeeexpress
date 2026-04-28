import { useState, useEffect } from "react";
import coffeeVideo from "./assets/coffee.mp4";
import aboutVideo from "./assets/aboutuscoffee.mp4";
import expressVideo from "./assets/expressreklam.mp4";
import expresslogo from "./assets/logo.png";
import corner1 from "./assets/corner1.png";
import corner2 from "./assets/corner2.jpeg";
import corner3 from "./assets/corner3.jpeg";
import corner4 from "./assets/corner4.png";
import espressoImg from "./assets/espresso.png";
import americanoImg from "./assets/americano.png";
import cappucinoImg from "./assets/cappucino.png";
import latteImg from "./assets/latte.png";
import turkkahvesiImg from "./assets/turkkahvesi.png";
import icedLatteImg from "./assets/icedlatte.png";
import frappeImg from "./assets/frappe.png";
import icedAmericanoImg from "./assets/coldbrew.png";
import icedMochaImg from "./assets/icedmocha.png";
import milkshakeImg from "./assets/milkshake.png";
import frozenImg from "./assets/frozen.png";
import macchiatoImg from "./assets/macchiato.png";
import tiramisuImg from "./assets/tiramusu.png";
import brownieImg from "./assets/brownie.png";
import cookieImg from "./assets/cookie.png";
import cheesecakeImg from "./assets/cheesecake.png";
import logo from "./assets/logo.png";
import CoffeeCornerPreview from "./components/CoffeeCornerPreview";
import SubeGalerisi from "./components/SubeGalerisi";
import SectionDivider from "./components/SectionDivider";

const NAV_LINKS = [
  "Hakkımızda",
  "Menü",
  "Şubeler",
  "Coffee Corner",
  "İletişim"
];

// Sabit array - useMemo gereksiz, component dışında tanımlanabilir
const CORNER_GALLERY = [corner1, corner2, corner3, corner4];

const MENU_ITEMS = [
  {
    category: "Espresso Bazlı",
    items: [
      { name: "Espresso", desc: "Yoğun ve aromatik tek shot", price: "45", img: espressoImg },
      { name: "Americano", desc: "Espresso ve sıcak su", price: "55", img: americanoImg },
      { name: "Cappuccino", desc: "Espresso, buharlanmış süt ve köpük", price: "65", img: cappucinoImg },
      { name: "Latte", desc: "Kremalı ve yumuşak espresso", price: "70", img: latteImg },
    ],
  },
  {
    category: "Soğuk İçecekler",
    items: [
      { name: "Iced Latte", desc: "Buz üzerinde espresso ve soğuk süt", price: "75", img: icedLatteImg },
      { name: "Cold Brew", desc: "12 saat soğuk demleme, yumuşak içim", price: "80", img: icedAmericanoImg },
      { name: "Frappe", desc: "Blended buzlu kahve, köpüklü lezzet", price: "85", img: frappeImg },
      { name: "Iced Mocha", desc: "Buz, çikolata ve kahvenin muhteşem uyumu", price: "70", img: icedMochaImg },
    ],
  },
  {
    category: "Özel Lezzetlerimiz",
    items: [
      { name: "Türk Kahvesi", desc: "Klasik, köpüklü ve yoğun aroma", price: "60", img: turkkahvesiImg },
      { name: "Milkshake", desc: "Oreo, çikolata ve çilek seçenekleriyle soğuk ve kremamsı lezzet", price: "65", img: milkshakeImg },
      { name: "Frozen", desc: "Mocha, latte ve meyve aromalarıyla serinletici içecek", price: "65", img: frozenImg },
      { name: "Karamal Macchiato", desc: "Espresso, süt ve karamel sos ile hazırlanan dengeli bir kahve.", price: "75", img: macchiatoImg },
    ],
  },
  {
    category: "Tatlılar",
    items: [
      { name: "Cheesecake", desc: "Karamelize üst katman, kremamsı doku", price: "120", img: cheesecakeImg },
      { name: "Tiramisu", desc: "Kahveli kreması ve kakao dokunuşu", price: "115", img: tiramisuImg },
      { name: "Brownie", desc: "Yoğun çikolata, dışı hafif çıtır", price: "95", img: brownieImg },
      { name: "Cookie", desc: "Çikolata parçalı, harika lezzet", price: "70", img: cookieImg },
    ],
  },
];

const BRANCHES = [
  {
    city: "Bolu",
    name: "Dörtdivan İstanbul Yönü Shell Coffee Express",
    mapUrl: "https://maps.app.goo.gl/iTbyZT9Z7PowRRaQ6",
  },
  {
    city: "Bolu",
    name: "Dörtdivan Ankara Yönü Shell Coffee Express",
    mapUrl: "https://maps.app.goo.gl/DWC1q8WFx1iUTZBz5",
  },
  {
    city: "Bolu",
    name: "Dörtdivan İstanbul Yönü Köfteexpress",
    mapUrl: "https://maps.app.goo.gl/eHzSTFxhcBiTAKrQ9",
  },
  {
    city: "Bolu",
    name: "Dörtdivan Ankara Yönü Köfteexpress",
    mapUrl: "https://maps.app.goo.gl/qYHPoTzkczqEBenz8",
  },
  {
    city: "Mersin",
    name: "Bumer Dinlenme Tesisleri Coffee Express",
    mapUrl: "https://maps.app.goo.gl/jeqPonhbEH2nmBGk9",
  },
  {
    city: "Kırklareli",
    name: "Babaeski İstanbul Yönü Coffee Express",
    mapUrl: "https://maps.app.goo.gl/Nfz6VwQfUR2m6b8b8",
  },
  {
    city: "Kırklareli",
    name: "Babaeski Edirne Yönü Coffee Express",
    mapUrl: "https://maps.app.goo.gl/YrPdXaZtKHkUSbLZ6",
  },
  {
    city: "İstanbul",
    name: "Samandıra Coffee Express",
    mapUrl: "https://maps.app.goo.gl/VEmbcK9Rp8PK5QJQA",
  },
  {
    city: "İstanbul",
    name: "Dudullu Coffee Express",
    mapUrl: "https://maps.app.goo.gl/DB4yQGY39AetYeD18",
  },
];

const COFFEE_CORNERS = [
  { id: "bolu-kaynasli-sabahattinin-yeri", name: "Sabahattinin yeri", city: "Bolu", address: "Kaynaşlı", mapUrl: "https://maps.app.goo.gl/c6F5o7Lf9P2V2Mo17" },
  { id: "istanbul-dudullu-metro-dinlenme", name: "Metro Dinlenme Tesisi", city: "İstanbul", address: "Dudullu", mapUrl: "https://maps.app.goo.gl/DB4yQGY39AetYeD18" },
  { id: "istanbul-beykoz-metro-holding", name: "Metro Holding", city: "İstanbul", address: "Beykoz", mapUrl: "https://maps.app.goo.gl/pRzd9A17pHKg4KNN8" },
  { id: "istanbul-samandira-metro-dinlenme", name: "Metro Dinlenme Tesisi", city: "İstanbul", address: "Samandıra", mapUrl: "https://maps.app.goo.gl/VEmbcK9Rp8PK5QJQA" },
  { id: "kocaeli-izmit-ulviye-gida", name: "Ulviye Gıda", city: "Kocaeli", address: "İzmit", mapUrl: "https://maps.app.goo.gl/ndh1XYPnzV33VWQq5" },
  { id: "balikesir-susurluk-efe-park", name: "Efe Park Dinlenme Tesisi", city: "Balıkesir", address: "Susurluk", mapUrl: "https://maps.app.goo.gl/hGahMWnFMV8BiHpR7" },
  { id: "tekirdag-cerkezkoy-istanbul-shell", name: "İstanbul Shell", city: "Tekirdağ", address: "Çerkezköy", mapUrl: "https://maps.app.goo.gl/hA4wsDCsPZgESUgP9" },
  { id: "tekirdag-cerkezkoy-edirne-yonu-shell", name: "Edirne Yönü Shell", city: "Tekirdağ", address: "Çerkezköy", mapUrl: "https://maps.app.goo.gl/iwNwRSbCjEkhMGCp6" },
  { id: "kirklareli-babaeski-istanbul-yonu-metropark", name: "İstanbul Yönü Metropark Dinlenme Tesisleri", city: "Kırklareli", address: "Babaeski", mapUrl: "https://maps.app.goo.gl/Nfz6VwQfUR2m6b8b8" },
  { id: "kirklareli-babaeski-edirne-yonu-metropark", name: "Edirne Yönü Metropark Dinlenme Tesisleri", city: "Kırklareli", address: "Babaeski", mapUrl: "https://maps.app.goo.gl/YrPdXaZtKHkUSbLZ6" },
];
const WHATSAPP_NUMBER = "905051889080";

export default function App() {
  const [menuCat, setMenuCat] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [menuReveal, setMenuReveal] = useState(false);
  const [city, setCity] = useState("Tümü");
  const [cornerPreviewOpen, setCornerPreviewOpen] = useState(false);

  // ✅ Lightbox state'leri App() içinde
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const openLightbox = (index) => {
    setActiveImg(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevImg = () =>
    setActiveImg((i) => (i - 1 + CORNER_GALLERY.length) % CORNER_GALLERY.length);

  const nextImg = () =>
    setActiveImg((i) => (i + 1) % CORNER_GALLERY.length);

  // ✅ useEffect App() içinde
  useEffect(() => {
    const onKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen]);

  const filteredBranches = city === "Tümü" ? BRANCHES : BRANCHES.filter((b) => b.city === city);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSendError("");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const res = await fetch("https://formsubmit.co/ajax/iletisim@ekspreskafe.com.tr", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!res.ok) throw new Error("Gönderim başarısız.");

      setSent(true);
      form.reset();
    } catch (err) {
      setSendError("Mesaj gönderilemedi. Lütfen tekrar deneyin.");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMenuReveal(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const sectionIds = ["about", "menu", "branches", "corners", "contact"];

  return (
    <div className="min-h-screen bg-brand text-white font-serif">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-[900] bg-brand/95 backdrop-blur-xl border-b border-white/10">
        <div className="relative mx-auto max-w-[1200px] h-20 px-5 sm:px-8 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center group"
            aria-label="Ana sayfaya git"
          >
            <img
              src={expresslogo}
              alt="Coffee Express"
              className="h-12 w-auto object-contain brightness-0 invert transition group-hover:opacity-90"
            />
          </button>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((label, i) => (
              <button
                key={label}
                onClick={() => scrollTo(sectionIds[i])}
                className="group font-sans text-[12px] uppercase tracking-[0.18em] text-white/80 hover:text-white transition relative"
              >
                {label}
                <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-white/70 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
            onClick={() => setMenuOpen((s) => !s)}
            aria-label="Menüyü aç/kapat"
          >
            <span className="text-[22px] leading-none">
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>

        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96" : "max-h-0"}`}>
          <div className="px-5 sm:px-8 pb-6 pt-4 flex flex-col gap-4">
            {NAV_LINKS.map((label, i) => (
              <button
                key={label}
                onClick={() => scrollTo(sectionIds[i])}
                className="text-center font-sans text-[13px] uppercase tracking-[0.2em] text-white/85 hover:text-white transition py-2"
              >
                {label}
              </button>
            ))}

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3 font-sans text-[12px] uppercase tracking-[0.2em] font-semibold hover:scale-105 transition"
              onClick={() => setMenuOpen(false)}
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="pt-20 bg-brand text-white">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* LEFT: Text */}
            <div className="max-w-[720px]">
              <p
                className={`section-label text-white/70 mb-4 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                Yolun En Lezzetli Molası
              </p>

              <h1
                className={`text-white font-light leading-[1.05] tracking-[-0.02em] text-[clamp(44px,6vw,86px)] transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                Her Yudumda <br />
                <span className="italic text-white">Mükemmellik</span>
              </h1>

              <p
                className={`font-sans text-white/70 text-[16px] sm:text-[17px] leading-[1.9] mt-6 max-w-[520px] transition-all duration-700 delay-150 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                Yol bazen bir kaçış, bazen bir başlangıçtır.
                Coffee Express, bu anlara eşlik eden en kaliteli kahve deneyimini sunmak için kuruldu.
                Şehir içinde ya da uzun bir yolculukta, her durakta aynı sıcaklığı ve aynı lezzeti bulursunuz.
              </p>

              <div
                className={`mt-10 flex flex-wrap gap-3 transition-all duration-700 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                <button className="btn-primary" onClick={() => scrollTo("menu")}>
                  Menüyü Keşfet
                </button>
                <button className="btn-outline" onClick={() => scrollTo("branches")}>
                  Şubeleri Bul
                </button>
              </div>

              <div className="mt-12 grid max-w-[560px] grid-cols-2 gap-8 border-t border-white/10 pt-8 sm:grid-cols-4">
                {[
                  ["9", "Şube"],
                  ["7/24", " Hizmet"],
                  ["2023", "Kuruluş"],
                  ["100K+", "Mutlu Müşteri"],
                ].map(([num, label]) => (
                  <div key={label}>
                    <div className="text-white font-light leading-none text-[clamp(28px,3.5vw,44px)]">
                      {num}
                    </div>
                    <div className="mt-2 font-sans text-[11px] uppercase tracking-[0.2em] text-white/55">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Video */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand/40 via-transparent to-transparent" />
                <video
                  className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px]"
                  src={expressVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

            <div>
              <p className="section-label text-brand mb-4">
                Hakkımızda
              </p>

              <h2
                className="text-brand font-light leading-[1.08] tracking-[-0.02em] mb-6 text-[clamp(34px,4vw,56px)]"
              >
                Kahveye Olan <br />
                <span className="italic">Tutkumuz</span>
              </h2>

              <div className="h-[2px] w-14 bg-brand mb-8" />

              <p className="font-sans text-brand/75 leading-[1.9] text-[15px] mb-5 font-light">
                Coffee Express, özenle seçilen kahve çekirdeklerini dünyanın dört bir yanından
                getirerek her noktada aynı kaliteyi sunar. Uzman baristalarımız her fincanı
                aynı özenle hazırlar — fark yaratan tek şey durağınız, kahvenin kalitesi değil.
              </p>

              <button
                onClick={() => scrollTo("contact")}
                className="inline-flex items-center justify-center rounded-full bg-brand text-white px-7 py-3
                 font-sans text-[12px] uppercase tracking-[0.2em] font-semibold
                 hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                İletişime Geç
              </button>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-brand/10 bg-brand shadow-2xl">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/10 z-10" />
                <video
                  src={aboutVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-[360px] sm:h-[440px] w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-8 left-0 w-full px-3">
                <div className="flex justify-between gap-2">
                  <div className="flex-1 rounded-2xl bg-brand px-3 py-3 text-center shadow-[0_15px_40px_rgba(34,66,81,0.35)] border border-white/10">
                    <div className="text-white font-light text-[13px] sm:text-[16px]">Kalite</div>
                    <div className="mt-1 font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/70">Çekirdeğinden</div>
                  </div>
                  <div className="flex-1 rounded-2xl bg-brand px-3 py-3 text-center shadow-[0_15px_40px_rgba(34,66,81,0.35)] border border-white/10">
                    <div className="text-white font-light text-[13px] sm:text-[16px]">Ustalık</div>
                    <div className="mt-1 font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/70">Baristadan</div>
                  </div>
                  <div className="flex-1 rounded-2xl bg-brand px-3 py-3 text-center shadow-[0_15px_40px_rgba(34,66,81,0.35)] border border-white/10">
                    <div className="text-white font-light text-[13px] sm:text-[16px]">Lezzet</div>
                    <div className="mt-1 font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/70">Bardağına</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="bg-brand text-white relative overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 py-16 sm:py-24">
          <div className="text-center mb-10">
            <p className="section-label text-white/60 mb-4">
              Lezzetlerimiz
            </p>
            <h2
              className="font-light leading-[1.08] tracking-[-0.02em] text-[clamp(34px,4vw,56px)]"
            >
              Menümüz
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {MENU_ITEMS.map((cat, i) => (
              <button
                key={cat.category}
                onClick={() => setMenuCat(i)}
                className={`px-5 py-2 rounded-full font-sans text-[11px] uppercase tracking-[0.18em] transition
            ${menuCat === i
                    ? "bg-white text-brand shadow-lg"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {MENU_ITEMS[menuCat].items.map((item) => (
              <div
                key={item.name}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5
                     shadow-[0_10px_30px_rgba(0,0,0,0.18)]
                     transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
                style={{ aspectRatio: "4/5" }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                <div
                  className={`absolute left-0 right-0 bottom-0 p-3 transition-all duration-700
              ${menuReveal ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                    <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-white/85">
                      {item.name}
                    </span>
                  </div>
                </div>

                <div
                  className="absolute inset-x-0 bottom-0 translate-y-8 opacity-0
                       transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <div className="m-3 rounded-2xl border border-white/15 bg-black/35 backdrop-blur-md p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-white font-semibold text-[14px] tracking-[0.01em]">
                        {item.name}
                      </h3>
                      <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-white/70">
                        {MENU_ITEMS[menuCat].category}
                      </span>
                    </div>

                    <div className="mt-2 h-px w-10 bg-white/30" />

                    <p className="mt-3 font-sans text-[12px] leading-[1.6] text-white/75">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center font-sans text-[12px] text-white/45">
            * Görseller temsilidir. Menü içerikleri şubeye göre değişebilir.
          </p>
        </div>
      </section>

      {/* BRANCHES */}
      <section id="branches" className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 py-16 sm:py-24">
          <div className="text-center mb-10 sm:mb-14">
            <h2
              className="text-brand font-light leading-[1.08] tracking-[-0.02em] text-[clamp(34px,4vw,56px)]"
            >
              Şubelerimiz
            </h2>
            <p className="mt-4 font-sans text-[14px] leading-[1.8] text-brand/60">
              Size en yakın Coffee Express'i keşfedin.
            </p>
          </div>

          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {["Tümü", "Bolu", "Mersin", "Kırklareli", "İstanbul"].map((c) => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={`px-6 py-2.5 rounded-full font-sans text-[12px] uppercase tracking-[0.18em] transition
          ${city === c ? "bg-brand text-white shadow-lg" : "bg-brand/5 text-brand/70 hover:bg-brand/10"}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:gap-7 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {filteredBranches.map((branch) => (
              <div
                key={branch.name}
                className="group grain relative w-full max-w-[380px] overflow-hidden rounded-3xl border border-brand/10 bg-white p-8
                 shadow-[0_10px_40px_rgba(34,66,81,0.08)]
                 transition hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(34,66,81,0.16)]"
              >
                <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl opacity-0 transition group-hover:opacity-100" />

                <div className="mb-5 inline-flex items-center justify-center rounded-full gap-2 rounded-full bg-brand px-4 py-2">
                  <span className="text-[14px] leading-none">📍</span>
                  <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-white">
                    {branch.city}
                  </span>
                </div>

                <h3 className="text-brand text-[18px] sm:text-[19px] font-semibold tracking-[0.01em] mb-3">
                  {branch.name}
                </h3>

                <div className="h-[2px] w-10 bg-brand/30 mb-6 transition-all duration-300 group-hover:w-16 group-hover:bg-brand/50" />

                <p className="font-sans text-[13px] leading-[1.8] text-brand/70 mb-7">
                  {branch.address}
                </p>

                <div className="flex justify-center">
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-brand/15 px-5 py-2.5
                     font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-brand
                     transition hover:bg-brand hover:text-white hover:border-brand"
                  >
                    Haritada Gör <span className="transition group-hover:translate-x-0.5">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative py-14">
        <div className="mx-auto max-w-[800px] px-5 sm:px-10">
          <div className="h-px w-full bg-brand/15 relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-px w-32 bg-brand/60" />
          </div>
        </div>
      </div>


{/* COFFEE CORNER */}
      <section id="corners" className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 py-16 sm:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            {/* LEFT */}
            <div>
              <p className="section-label text-brand mb-4">
                Coffee Corner
              </p>

              <h2
                className="text-brand font-light leading-[1.08] tracking-[-0.02em] mb-6 text-[clamp(34px,4vw,56px)]"
              >
                Mekanınıza<br />
                <span className="italic">Coffee Corner</span>
              </h2>

              <div className="h-[2px] w-14 bg-brand mb-8" />

              <p className="font-sans text-brand/75 leading-[1.9] text-[15px] mb-6 font-light">
                Şubelerimizin yanında; ofis, istasyon, otel ve işletmelere özel Coffee
                Corner kurulumları yapıyoruz. Ekipman, ürün tedariki ve barista
                standartlarımızla işletmenize profesyonel kahve deneyimi getiriyoruz.
              </p>

              {/* Gallery */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {CORNER_GALLERY.map((img, index) => {
                  const isFeatured = index === 0;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => openLightbox(index)}
                      className={[
                        "relative overflow-hidden rounded-3xl border border-brand/10 bg-brand/5",
                        "shadow-[0_10px_40px_rgba(34,66,81,0.08)]",
                        "group cursor-pointer text-left",
                        "focus:outline-none focus:ring-2 focus:ring-white/30",
                        isFeatured ? "col-span-2 row-span-2 sm:col-span-2" : "",
                      ].join(" ")}
                    >
                      <img
                        src={img}
                        alt={`Coffee Corner ${index + 1}`}
                        loading="lazy"
                        className={[
                          "w-full object-cover transition duration-500 group-hover:scale-110",
                          isFeatured ? "h-[320px] sm:h-[360px]" : "h-[150px] sm:h-[170px]",
                        ].join(" ")}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/35 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition" />
                      <div className="absolute left-4 bottom-4 opacity-0 group-hover:opacity-100 transition">
                        <div className="rounded-full bg-white/15 border border-white/20 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/85 font-sans backdrop-blur-sm">
                          Büyütmek için tıkla
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* CTA KARTI */}
              <div
                className="mt-10 rounded-3xl overflow-hidden"
                style={{
                  border: "1px solid rgba(34,66,81,0.13)",
                  boxShadow: "0 16px 48px rgba(34,66,81,0.1)",
                }}
              >
                {/* Üst: editorial başlık + tek paragraf */}
                <div
                  className="px-7 py-10 sm:px-10 sm:py-12"
                  style={{
                    background: "linear-gradient(140deg,#0f2430 0%,#1a3344 100%)",
                  }}
                >
                  <p className="section-label mb-5" style={{ color: "#c47a3a" }}>
                    Ücretsiz Önizleme
                  </p>

                  <h3 className="font-serif text-white font-light leading-[1.15] text-[28px] sm:text-[34px] mb-5">
                    Mekanınıza Nasıl <br />
                    <span className="italic" style={{ color: "#c47a3a" }}>Yakışır?</span>
                  </h3>

                  <p className="font-sans text-white/65 text-[14px] leading-[1.75] max-w-[380px]">
                    Kendi fotoğrafınıza yerleştirin, Coffee Corner'ın
                    mekanınızda nasıl duracağını saniyeler içinde görün.
                  </p>
                </div>

                {/* Orta: ana buton */}
                <button
                  onClick={() => setCornerPreviewOpen(true)}
                  className="group relative w-full flex items-center justify-between px-7 py-5 sm:px-10 sm:py-6 transition-all duration-300 hover:brightness-110"
                  style={{ background: "#c47a3a" }}
                >
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.13) 50%,transparent 100%)",
                    }}
                  />

                  <span className="font-sans text-white font-semibold text-[13px] uppercase tracking-[0.22em]">
                    Önizlemeyi Başlat
                  </span>

                  <span className="text-white text-[20px] leading-none transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </button>

                {/* Alt: WhatsApp şeridi */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 font-sans text-[11px] uppercase tracking-[0.22em] font-semibold transition hover:brightness-105"
                  style={{ background: "#25D366", color: "#fff" }}
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.633 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp ile İletişime Geç
                </a>
              </div>
              {/* /CTA KARTI */}

            </div>

            {/* RIGHT: Locations */}
            <div>
              <div className="mb-8">
                <h3 className="text-brand text-[20px] sm:text-[22px] font-semibold tracking-[0.01em]">
                  Coffee Corner Lokasyonları
                </h3>
                <p className="mt-2 font-sans text-[13px] leading-[1.8] text-brand/60">
                  Şu an {COFFEE_CORNERS.length} farklı noktada hizmet veriyoruz.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {COFFEE_CORNERS.map((c) => (
                  <div
                    key={c.name}
                    className="group relative overflow-hidden rounded-3xl border border-brand/10 bg-white p-6
                     shadow-[0_10px_40px_rgba(34,66,81,0.08)]
                     transition hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(34,66,81,0.16)]"
                  >
                    {/* TOP: City + Name */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="relative inline-flex items-center rounded-full bg-brand px-4 py-2 border border-white/10 shadow-[0_10px_30px_rgba(34,66,81,0.25)] overflow-hidden">
                            <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-60" />
                            <span className="relative font-sans text-[10px] uppercase tracking-[0.26em] text-white">
                              {c.city}
                            </span>
                          </span>
                        </div>

                        <div className="mt-4 text-brand text-[16px] sm:text-[17px] font-semibold leading-snug truncate">
                          {c.name}
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="mt-4 flex items-start gap-2">
                      <span className="mt-[2px] text-brand/40">📌</span>
                      <div className="font-sans text-[13px] leading-[1.8] text-brand/65">
                        {c.address}
                      </div>
                    </div>

                    {/* Map */}
                    <div className="mt-6 flex justify-center">
                      <a
                        href={c.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/20 px-5 py-2.5
                          font-sans text-[10px] uppercase tracking-[0.22em] font-semibold text-brand bg-transparent
                          transition-all duration-300 hover:bg-brand hover:text-white hover:border-brand hover:-translate-y-0.5"
                      >
                        <span className="text-[12px] leading-none">📍</span>
                        Haritada Aç
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                      </a>
                    </div>

                    {/* glow */}
                    <div className="pointer-events-none absolute -top-24 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl opacity-0 transition group-hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* LIGHTBOX */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 z-50 p-2 text-white/60 hover:text-white transition-colors"
              onClick={closeLightbox}
              aria-label="Kapat"
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button
              className="absolute left-2 sm:left-8 z-50 p-3 text-white/60 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); prevImg(); }}
              aria-label="Önceki Görsel"
            >
              <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div
              className="relative max-w-5xl w-full max-h-[90vh] px-12 sm:px-24 flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={CORNER_GALLERY[activeImg]}
                alt={`Coffee Corner ${activeImg + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl select-none"
              />
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-[12px] font-sans tracking-[0.2em]">
                {activeImg + 1} / {CORNER_GALLERY.length}
              </div>
            </div>

            <button
              className="absolute right-2 sm:right-8 z-50 p-3 text-white/60 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); nextImg(); }}
              aria-label="Sonraki Görsel"
            >
              <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </section>

            {/* Section Divider */}
      <div className="relative py-14">
        <div className="mx-auto max-w-[800px] px-5 sm:px-10">
          <div className="h-px w-full bg-brand/15 relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-px w-32 bg-brand/60" />
          </div>
        </div>
      </div>
      <SubeGalerisi />

      {/* CONTACT */}
      <section id="contact" className="bg-brand text-white relative overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="section-label text-white/60 mb-4">
                Bize Ulaşın
              </p>

              <h2
                className="font-light leading-[1.08] tracking-[-0.02em] mb-6 text-[clamp(34px,4vw,56px)]"
              >
                Bir Mesafe Kadar <span className="italic"> Yakınız</span>
              </h2>

              <div className="h-[2px] w-24 bg-white/30 mb-8" />

              <p className="font-sans text-white/70 leading-[1.9] text-[15px] font-light mb-10 max-w-[520px]">
                Sorularınız, önerileriniz ya da kurumsal talepleriniz için bizimle iletişime geçin.
                En kısa sürede size dönüş yapacağız.
              </p>

              <div className="space-y-4 font-sans text-[14px] text-white/75">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 border border-white/10">📧</span>
                  <span>iletisim@ekspreskafe.com.tr</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 border border-white/10">💬</span>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-white/30 underline-offset-4 hover:text-[#25D366] hover:decoration-[#25D366] transition"
                  >
                    Bize Ulaşın
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 border border-white/10">📍</span>
                  <span className="text-white/75">
                    Cumhuriyet, Reşadiye Cd. No:14, Ekspres Kafe Gıda İşletmeciliği 34829 Beykoz/İstanbul
                  </span>
                </div>
              </div>
            </div>

            {sent ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-sm text-center flex flex-col items-center">
                <h3 className="text-[24px] font-light mb-4">
                  Mesajınız bize ulaştı ✅
                </h3>
                <p className="font-sans text-white/70 leading-[1.9] max-w-[420px] mb-8">
                  En kısa sürede size dönüş yapacağız.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="inline-flex items-center justify-center rounded-full bg-white text-brand px-6 py-3
               font-sans text-[12px] uppercase tracking-[0.2em] font-semibold
               hover:-translate-y-0.5 hover:shadow-xl transition"
                >
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative space-y-6">
                <input type="hidden" name="_subject" value="Coffee Express - Yeni İletişim Formu" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ad" className="sr-only">Adınız</label>
                    <input
                      id="ad"
                      name="ad"
                      required
                      className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder:text-white/40
                     font-sans text-[14px] outline-none focus:border-white/30 focus:bg-white/10 transition"
                      placeholder="Adınız"
                      type="text"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">E-posta Adresiniz</label>
                    <input
                      id="email"
                      name="email"
                      required
                      className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder:text-white/40
                     font-sans text-[14px] outline-none focus:border-white/30 focus:bg-white/10 transition"
                      placeholder="E-posta Adresiniz"
                      type="email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="konu" className="sr-only">Konunuz</label>
                  <input
                    id="konu"
                    name="konu"
                    required
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder:text-white/40
                   font-sans text-[14px] outline-none focus:border-white/30 focus:bg-white/10 transition"
                    placeholder="Konunuz"
                    type="text"
                  />
                </div>

                <div>
                  <label htmlFor="mesaj" className="sr-only">Mesajınız</label>
                  <textarea
                    id="mesaj"
                    name="mesaj"
                    required
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder:text-white/40
                   font-sans text-[14px] outline-none focus:border-white/30 focus:bg-white/10 transition"
                    placeholder="Mesajınız"
                    rows={5}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-full bg-white text-brand px-6 py-4
                 font-sans text-[12px] uppercase tracking-[0.2em] font-semibold
                 hover:-translate-y-0.5 hover:shadow-xl transition disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {sending ? "Gönderiliyor..." : "Mesaj Gönder"}
                </button>

                {sendError && (
                  <p className="font-sans text-[12px] text-red-200">{sendError}</p>
                )}

                <p className="font-sans text-[12px] text-white/45 text-center">
                  Gönderdiğiniz mesaj, ekibimize e-posta olarak iletilir.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand text-white border-t border-white/10">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 py-12">
          <div className="grid gap-10 sm:grid-cols-3 sm:items-start">

            <div className="flex flex-col gap-4 items-center">
              <button
                onClick={() => scrollTo("home")}
                className="inline-flex items-center"
                aria-label="Ana sayfaya git"
              >
                <img
                  src={expresslogo}
                  alt="Coffee Express"
                  className="h-12 w-auto object-contain brightness-0 invert transition hover:opacity-90"
                />
              </button>
            </div>

            <div className="flex flex-col gap-4 items-center sm:items-center text-center">
              <div className="font-sans text-[11px] uppercase tracking-[0.35em] text-white/50">
                Sosyal Medya
              </div>
              <div className="flex gap-6 justify-center">
                {["Instagram"].map((sm) => (
                  <a
                    key={sm}
                    href="https://www.instagram.com/coffeeexpresstr"
                    className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition"
                  >
                    {sm}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 sm:mt-0 text-center sm:text-right font-sans text-[12px] text-white/45">
              © {new Date().getFullYear()} Tüm hakları saklıdır.
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp ile Yaz"
        className="
    fixed bottom-6 right-6 z-[999]
    w-14 h-14
    rounded-full
    bg-[#25D366]
    text-white
    flex items-center justify-center
    shadow-[0_12px_30px_rgba(37,211,102,0.45)]
    hover:scale-110
    hover:shadow-[0_16px_40px_rgba(37,211,102,0.6)]
    transition-all duration-300
  "
      >
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.633 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
                {cornerPreviewOpen && (
            <CoffeeCornerPreview onClose={() => setCornerPreviewOpen(false)} />
          )}
    </div>
  );
}