import { useState, useEffect, useMemo } from "react";
import coffeeVideo from "./assets/coffee.mp4";
import aboutVideo from "./assets/aboutuscoffee.mp4";
import expressVideo from "./assets/expressreklam.mp4";
import cornerImg from "./assets/corner.png";

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

const NAV_LINKS = [
  "Hakkımızda",
  "Menü",
  "Şubeler",
  "Coffee Corner",
  "İletişim"
];

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
      {
        name: "Iced Latte",
        desc: "Buz üzerinde espresso ve soğuk süt",
        price: "75",
        img: icedLatteImg,
      },
      {
        name: "Cold Brew",
        desc: "12 saat soğuk demleme, yumuşak içim",
        price: "80",
        img: icedAmericanoImg,
      },
      {
        name: "Frappe",
        desc: "Blended buzlu kahve, köpüklü lezzet",
        price: "85",
        img: frappeImg,
      },
      {
        name: "Iced Mocha",
        desc: "Buz, çikolata ve kahvenin muhteşem uyumu",
        price: "70",
        img: icedMochaImg,
      },
    ],
  },

  {
    category: "Özel Lezzetlerimiz",
    items: [
      {
        name: "Türk Kahvesi",
        desc: "Klasik, köpüklü ve yoğun aroma",
        price: "60",
        img: turkkahvesiImg,
      },
      {
        name: "Milkshake",
        desc: "Oreo, çikolata ve çilek seçenekleriyle soğuk ve kremamsı lezzet",
        price: "65",
        img: milkshakeImg,
      },
      {
        name: "Frozen",
        desc: "Mocha, latte ve meyve aromalarıyla serinletici içecek",
        price: "65",
        img: frozenImg,
      },
      {
        name: "Karamal Macchiato",
        desc: "Espresso, süt ve karamel sos ile hazırlanan dengeli bir kahve.",
        price: "75",
        img: macchiatoImg,
      },
    ],
  },

  {
    category: "Tatlılar",
    items: [
      {
        name: "Cheesecake",
        desc: "Karamelize üst katman, kremamsı doku",
        price: "120",
        img: cheesecakeImg,
      },
      {
        name: "Tiramisu",
        desc: "Kahveli kreması ve kakao dokunuşu",
        price: "115",
        img: tiramisuImg,
      },
      {
        name: "Brownie",
        desc: "Yoğun çikolata, dışı hafif çıtır",
        price: "95",
        img: brownieImg,
      },
      {
        name: "Cookie",
        desc: "Çikolata parçalı, harika lezzet",
        price: "70",
        img: cookieImg,
      },
    ],
  },
];
const BRANCHES = [
  {
    city: "Bolu",
    name: "İstanbul Yönü Shell Coffee Express",
    address: "Bolu • İstanbul Yönü • Shell",
    phone: "+90 000 000 00 00",
    hours: "07:00 - 22:00",
    mapUrl: "https://maps.app.goo.gl/iTbyZT9Z7PowRRaQ6",
  },
  {
    city: "Bolu",
    name: "Ankara Yönü Shell Coffee Express",
    address: "Bolu • Ankara Yönü • Shell",
    phone: "+90 000 000 00 00",
    hours: "07:00 - 22:00",
    mapUrl: "https://maps.app.goo.gl/DWC1q8WFx1iUTZBz5",
  },
  {
    city: "Kırklareli",
    name: "Babaeski İstanbul Yönü Coffee Express",
    address: "Kırklareli • Babaeski • İstanbul Yönü",
    phone: "+90 000 000 00 00",
    hours: "07:00 - 22:00",
    mapUrl: "https://maps.app.goo.gl/ibAJFCAzMDiUnvE9A",
  },
  {
    city: "Kırklareli",
    name: "Babaeski Edirne Yönü Coffee Express",
    address: "Kırklareli • Babaeski • Edirne Yönü",
    phone: "+90 000 000 00 00",
    hours: "07:00 - 22:00",
    mapUrl: "https://maps.app.goo.gl/rhuaWELNnQ2ccXqL9",
  },
  {
    city: "İstanbul",
    name: "Samandıra Coffee Express",
    address: "İstanbul • Samandıra",
    phone: "+90 000 000 00 00",
    hours: "07:00 - 23:00",
    mapUrl: "https://maps.app.goo.gl/TKdwfJdzbLKbQNn27",
  },
];

const COFFEE_CORNERS = [
  { name: "Bolu Shell Coffee Corner", city: "Bolu", address: "İstanbul Yönü • Shell", mapUrl: "https://maps.google.com/?q=Bolu+Shell+Coffee+Corner" },
  { name: "Ankara Yönü Coffee Corner", city: "Bolu", address: "Ankara Yönü • Shell", mapUrl: "https://maps.google.com/?q=Ankara+Yönü+Coffee+Corner+Bolu" },
  { name: "Babaeski Coffee Corner", city: "Kırklareli", address: "Babaeski • İstanbul Yönü", mapUrl: "https://maps.google.com/?q=Babaeski+Coffee+Corner" },
  { name: "Samandıra Coffee Corner", city: "İstanbul", address: "Samandıra", mapUrl: "https://maps.google.com/?q=Samandıra+Coffee+Corner" },
  { name: "Coffee Corner 5", city: "Bolu", address: "Lokasyon detayı", mapUrl: "https://maps.google.com/?q=Coffee+Corner+5" },
  { name: "Coffee Corner 6", city: "İstanbul", address: "Lokasyon detayı", mapUrl: "https://maps.google.com/?q=Coffee+Corner+6" },
  { name: "Coffee Corner 7", city: "Kırklareli", address: "Lokasyon detayı", mapUrl: "https://maps.google.com/?q=Coffee+Corner+7" },
];

const WHATSAPP_NUMBER = "905001234567";

export default function App() {
  const [menuCat, setMenuCat] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [menuReveal, setMenuReveal] = useState(false);
  const [city, setCity] = useState("Tümü");
  const filteredBranches = city === "Tümü" ? BRANCHES : BRANCHES.filter((b) => b.city === city);

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
        <div className="mx-auto max-w-[1200px] h-20 px-5 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-3 text-left group"
            aria-label="Ana sayfaya git"
          >
            <div className="w-[52px] h-[52px] rounded-full bg-white text-brand flex items-center justify-center text-[24px] shadow-sm transition group-hover:scale-[1.03]">
              ☕
            </div>
            <div className="leading-none">
              <div className="text-white font-semibold tracking-[0.12em] text-[20px] sm:text-[22px]">
                COFFEE
              </div>
              <div className="font-sans text-white/80 tracking-[0.35em] text-[11px] sm:text-[12px] mt-1">
                EXPRESS
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((label, i) => (
              <button
                key={label}
                onClick={() => scrollTo(sectionIds[i])}
                className="font-sans text-[12px] uppercase tracking-[0.18em] text-white/80 hover:text-white transition relative"
              >
                {label}
                <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-white/70 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Desktop WhatsApp */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-white text-brand px-5 py-2.5 font-sans text-[12px] uppercase tracking-[0.2em] font-semibold hover:shadow-lg hover:-translate-y-0.5 transition"
          >
            💬 WhatsApp
          </a>

          {/* Mobile Toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
            onClick={() => setMenuOpen((s) => !s)}
            aria-label="Menüyü aç/kapat"
          >
            <span className="text-[22px] leading-none">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96" : "max-h-0"}`}>
          <div className="px-5 sm:px-8 pb-6 pt-2 flex flex-col gap-3">
            {NAV_LINKS.map((label, i) => (
              <button
                key={label}
                onClick={() => scrollTo(sectionIds[i])}
                className="text-left font-sans text-[12px] uppercase tracking-[0.2em] text-white/85 hover:text-white transition py-2"
              >
                {label}
              </button>
            ))}

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white text-brand px-5 py-3 font-sans text-[12px] uppercase tracking-[0.2em] font-semibold"
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
                className={`font-sans text-white/70 tracking-[0.35em] uppercase text-[11px] mb-4 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
              >
                Yolun En Lezzetli Molası
              </p>

              <h1
                className={`text-white font-light leading-[1.05] tracking-[-0.02em] transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                style={{ fontSize: "clamp(44px, 6vw, 86px)" }}
              >
                Her Yudumda <br />
                <span className="italic text-white">Mükemmellik</span>
              </h1>

              <p
                className={`font-sans text-white/70 text-[16px] sm:text-[17px] leading-[1.9] mt-6 max-w-[520px] transition-all duration-700 delay-150 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
              >
                Coffee Express olarak her fincanda tutkuyla hazırlanan, özenle seçilmiş
                çekirdeklerden mükemmel kahve deneyimi sunuyoruz.
              </p>

              <div
                className={`mt-10 flex flex-wrap gap-3 transition-all duration-700 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
              >
                <button className="btn-primary" onClick={() => scrollTo("menu")}>
                  Menüyü Keşfet
                </button>
                <button className="btn-primary" onClick={() => scrollTo("branches")}>
                  Şubeleri Bul
                </button>
              </div>

              {/* Optional stats row */}
              <div className="mt-12 grid max-w-[560px] grid-cols-2 gap-8 border-t border-white/10 pt-8 sm:grid-cols-4">
                {[
                  ["5", "Şube"],
                  ["50+", "Seçkin Lezzet"],
                  ["2021", "Kuruluş"],
                  ["100K+", "Mutlu Müşteri"],
                ].map(([num, label]) => (
                  <div key={label}>
                    <div className="text-white font-light leading-none" style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
                      {num}
                    </div>
                    <div className="mt-2 font-sans text-[11px] uppercase tracking-[0.2em] text-white/55">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Video (desktop right, mobile bottom) */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
                {/* subtle overlay for readability */}
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

              {/* small badge */}
              <div className="absolute -bottom-5 left-6 flex gap-4">

                {/* 1 */}
                <div className="rounded-2xl bg-white px-5 py-3 shadow-xl">
                  <div className="text-brand font-serif text-[18px] font-light leading-none">
                    %100
                  </div>
                  <div className="mt-1 font-sans text-[10px] uppercase tracking-[0.3em] text-brand/80">
                    Özenle Seçim
                  </div>
                </div>

                {/* 2 */}
                <div className="rounded-2xl bg-white px-5 py-3 shadow-xl">
                  <div className="text-brand font-serif text-[18px] font-light leading-none">
                    %100
                  </div>
                  <div className="mt-1 font-sans text-[10px] uppercase tracking-[0.3em] text-brand/80">
                    Müşteri Hizmeti
                  </div>
                </div>

                {/* 3 */}
                <div className="rounded-2xl bg-white px-5 py-3 shadow-xl">
                  <div className="text-brand font-serif text-[18px] font-light leading-none">
                    %100
                  </div>
                  <div className="mt-1 font-sans text-[10px] uppercase tracking-[0.3em] text-brand/80">
                    Taze Çekirdek
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

            {/* Left: Text */}
            <div>
              <p className="font-sans text-brand tracking-[0.35em] uppercase text-[11px] mb-4">
                Hakkımızda
              </p>

              <h2
                className="text-brand font-light leading-[1.08] tracking-[-0.02em] mb-6"
                style={{ fontSize: "clamp(34px, 4vw, 56px)" }}
              >
                Kahveye Olan <br />
                <span className="italic">Tutkumuz</span>
              </h2>

              <div className="h-[2px] w-14 bg-brand mb-8" />

              <p className="font-sans text-brand/75 leading-[1.9] text-[15px] mb-5 font-light">
                2018 yılında İstanbul'da kurulan Coffee Express, en kaliteli kahve
                çekirdeklerini dünyanın dört bir yanından getirerek şehrin kalbinde
                özgün bir kahve deneyimi yaratmaktadır.
              </p>

              <p className="font-sans text-brand/75 leading-[1.9] text-[15px] mb-10 font-light">
                Uzman baristalarımız her fincanı sanatkârane bir özenle hazırlar.
                Amacımız; sadece kahve sunmak değil, unutulmaz bir an yaratmaktır.
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

            {/* Right: Video Card */}
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

              {/* Badges */}
              <div className="absolute -bottom-8 left-0 w-full px-6">
                <div className="flex justify-between gap-4">

                  <div className="flex-1 rounded-2xl bg-brand px-5 py-4 text-center shadow-[0_15px_40px_rgba(34,66,81,0.35)] border border-white/10">
                    <div className="text-white font-light text-[16px]">
                      Özenle Seçilen
                    </div>
                    <div className="mt-2 font-sans text-[10px] uppercase tracking-[0.3em] text-white/70">
                      Çekirdekler
                    </div>
                  </div>

                  <div className="flex-1 rounded-2xl bg-brand px-5 py-4 text-center shadow-[0_15px_40px_rgba(34,66,81,0.35)] border border-white/10">
                    <div className="text-white font-light text-[16px]">
                      Uzman
                    </div>
                    <div className="mt-2 font-sans text-[10px] uppercase tracking-[0.3em] text-white/70">
                      Baristalar
                    </div>
                  </div>

                  <div className="flex-1 rounded-2xl bg-brand px-5 py-4 text-center shadow-[0_15px_40px_rgba(34,66,81,0.35)] border border-white/10">
                    <div className="text-white font-light text-[16px]">
                      Maksimum
                    </div>
                    <div className="mt-2 font-sans text-[10px] uppercase tracking-[0.3em] text-white/70">
                      Tazelik
                    </div>
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
          {/* Header */}
          <div className="text-center mb-10">
            <p className="font-sans text-white/60 tracking-[0.35em] uppercase text-[11px] mb-4">
              Lezzetlerimiz
            </p>
            <h2
              className="font-light leading-[1.08] tracking-[-0.02em]"
              style={{ fontSize: "clamp(34px, 4vw, 56px)" }}
            >
              Menümüz
            </h2>
          </div>

          {/* Category Pills */}
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

          {/* Menu Grid (compact, image-first, delayed title, hover reveal) */}
          <div className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {MENU_ITEMS[menuCat].items.map((item) => (
              <div
                key={item.name}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5
                     shadow-[0_10px_30px_rgba(0,0,0,0.18)]
                     transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
                style={{ aspectRatio: "4/5" }}
              >
                {/* IMAGE - always visible */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* subtle vignette */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                {/* Delayed name chip (1s after page load) */}
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

                {/* HOVER reveal panel (premium, no flip) */}
                <div
                  className="absolute inset-x-0 bottom-0 translate-y-8 opacity-0
                       transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <div className="m-3 rounded-2xl border border-white/15 bg-black/35 backdrop-blur-md p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-white font-medium text-[14px] tracking-[0.01em]">
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
              className="text-brand font-light leading-[1.08] tracking-[-0.02em]"
              style={{ fontSize: "clamp(34px, 4vw, 56px)" }}
            >
              Şubelerimiz
            </h2>
            <p className="mt-4 font-sans text-[14px] leading-[1.8] text-brand/60">
              Size en yakın Coffee Express’i keşfedin.
            </p>
          </div>

          {/* City Filter */}
          {/* bunun çalışması için: const [city, setCity] = useState("Tümü"); ekle */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {["Tümü", "Bolu", "Kırklareli", "İstanbul"].map((c) => (
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

          {/* Grid */}
          <div className="grid gap-6 sm:gap-7 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {filteredBranches.map((branch) => (
              <div
                key={branch.name}
                className="group grain relative w-full max-w-[380px] overflow-hidden rounded-3xl border border-brand/10 bg-white p-8
                 shadow-[0_10px_40px_rgba(34,66,81,0.08)]
                 transition hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(34,66,81,0.16)]"
              >
                {/* subtle top glow */}
                <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl opacity-0 transition group-hover:opacity-100" />

                {/* city tag */}
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand/5 px-4 py-2">
                  <span className="text-[14px] leading-none">📍</span>
                  <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-brand/70">
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

                {/* Centered Button */}
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

            {/* Left: Info + Image + CTA */}
            <div>
              <p className="font-sans text-brand tracking-[0.35em] uppercase text-[11px] mb-4">
                Coffee Corner
              </p>

              <h2
                className="text-brand font-light leading-[1.08] tracking-[-0.02em] mb-6"
                style={{ fontSize: "clamp(34px, 4vw, 56px)" }}
              >
                Mekanınıza<br />
                <span className="italic">Coffee Corner</span>
              </h2>

              <div className="h-[2px] w-14 bg-brand mb-8" />

              <p className="font-sans text-brand/75 leading-[1.9] text-[15px] mb-6 font-light">
                Şubelerimizin yanında; ofis, istasyon, otel ve işletmelere özel Coffee Corner kurulumları yapıyoruz.
                Ekipman, ürün tedariki ve barista standartlarımızla işletmenize profesyonel kahve deneyimi getiriyoruz.
              </p>

              {/* Image */}
              <div className="relative overflow-hidden rounded-3xl border border-brand/10 bg-brand/5 shadow-[0_10px_40px_rgba(34,66,81,0.08)]">
                {/* İstersen buraya gerçek görsel koy: /images/corner.jpg */}
<img
  src={cornerImg}
  alt="Coffee Corner"
  className="h-[280px] sm:h-[320px] w-full object-cover"
  loading="lazy"
/>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/10" />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollTo("contact")}
                  className="inline-flex items-center justify-center rounded-full bg-brand text-white px-7 py-3
                       font-sans text-[12px] uppercase tracking-[0.2em] font-semibold
                       hover:shadow-lg hover:-translate-y-0.5 transition"
                >
                  Corner mı Kurmak İstiyorsunuz?
                </button>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-brand/15 px-7 py-3
                       font-sans text-[12px] uppercase tracking-[0.2em] font-semibold text-brand
                       hover:bg-brand hover:text-white hover:border-brand transition"
                >
                  WhatsApp’tan Yaz
                </a>
              </div>
            </div>

            {/* Right: Locations */}
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
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center rounded-full bg-brand/5 px-4 py-2">
                        <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-brand/70">
                          {c.city}
                        </span>
                      </span>

                      <a
                        href={c.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-[10px] uppercase tracking-[0.22em] text-brand/60 hover:text-brand transition"
                      >
                        Harita →
                      </a>
                    </div>

                    <div className="text-brand text-[16px] font-semibold leading-snug">
                      {c.name}
                    </div>

                    <div className="mt-3 font-sans text-[13px] leading-[1.8] text-brand/65">
                      {c.address}
                    </div>

                    {/* subtle glow */}
                    <div className="pointer-events-none absolute -top-24 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl opacity-0 transition group-hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-brand text-white relative overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left */}
            <div>
              <p className="font-sans tracking-[0.35em] uppercase text-[11px] text-white/60 mb-4">
                Bize Ulaşın
              </p>

              <h2
                className="font-light leading-[1.08] tracking-[-0.02em] mb-6"
                style={{ fontSize: "clamp(34px, 4vw, 56px)" }}
              >
                İletişime <span className="italic">Geçin</span>
              </h2>

              <div className="h-[2px] w-14 bg-white/30 mb-8" />

              <p className="font-sans text-white/70 leading-[1.9] text-[15px] font-light mb-10 max-w-[520px]">
                Sorularınız, önerileriniz ya da kurumsal talepleriniz için bizimle iletişime geçin.
                En kısa sürede size dönüş yapacağız.
              </p>

              <div className="space-y-4 font-sans text-[14px] text-white/75">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 border border-white/10">
                    📧
                  </span>
                  <span>info@coffeeexpress.com.tr</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 border border-white/10">
                    📞
                  </span>
                  <span>+90 850 000 00 00</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 border border-white/10">
                    💬
                  </span>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-white/30 underline-offset-4 hover:decoration-white/70 transition"
                  >
                    WhatsApp ile Yaz
                  </a>
                </div>
              </div>
            </div>

            <form
              action="https://formsubmit.co/mugiwaraozgur@gmail.com"
              method="POST"
              className="relative space-y-6"
            >
              {/* Formsubmit ayarları */}
              <input type="hidden" name="_subject" value="Coffee Express - Yeni İletişim Formu" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              {/* İstersen teşekkür sayfası */}
              {/* <input type="hidden" name="_next" value="https://siteadresin.com/tesekkurler" /> */}

              <div className="grid gap-6 sm:grid-cols-2">
                <input
                  name="ad"
                  required
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder:text-white/40
                 font-sans text-[14px] outline-none focus:border-white/30 focus:bg-white/10 transition"
                  placeholder="Adınız"
                  type="text"
                />
                <input
                  name="email"
                  required
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder:text-white/40
                 font-sans text-[14px] outline-none focus:border-white/30 focus:bg-white/10 transition"
                  placeholder="E-posta Adresiniz"
                  type="email"
                />
              </div>

              <input
                name="konu"
                required
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder:text-white/40
               font-sans text-[14px] outline-none focus:border-white/30 focus:bg-white/10 transition"
                placeholder="Konunuz"
                type="text"
              />

              <textarea
                name="mesaj"
                required
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder:text-white/40
               font-sans text-[14px] outline-none focus:border-white/30 focus:bg-white/10 transition"
                placeholder="Mesajınız"
                rows={5}
              />

              <button
                type="submit"
                className="w-full rounded-full bg-white text-brand px-6 py-4
               font-sans text-[12px] uppercase tracking-[0.2em] font-semibold
               hover:-translate-y-0.5 hover:shadow-xl transition"
              >
                Mesaj Gönder
              </button>

              <p className="font-sans text-[12px] text-white/45">
                Gönderdiğiniz mesaj, ekibimize e-posta olarak iletilir.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand text-white border-t border-white/10">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 py-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: Logo */}
            <button
              onClick={() => scrollTo("home")}
              className="flex items-center gap-3 text-left"
              aria-label="Ana sayfaya git"
            >
              <div className="w-10 h-10 rounded-full bg-white text-brand flex items-center justify-center text-[18px]">
                ☕
              </div>
              <div className="leading-none">
                <div className="text-white font-semibold tracking-[0.12em] text-[16px]">
                  COFFEE
                </div>
                <div className="font-sans text-white/70 tracking-[0.35em] text-[10px] mt-1">
                  EXPRESS
                </div>
              </div>
            </button>

            {/* Middle: Links */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 justify-start sm:justify-center">
              {["Instagram", "Facebook", "Twitter", "LinkedIn"].map((sm) => (
                <a
                  key={sm}
                  href="#"
                  className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition"
                >
                  {sm}
                </a>
              ))}
            </div>

            {/* Right: Copyright */}
            <div className="font-sans text-[12px] text-white/45">
              © {new Date().getFullYear()} Coffee Express. Tüm hakları saklıdır.
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
    bg-brand
    text-white
    flex items-center justify-center
    shadow-[0_10px_30px_rgba(34,66,81,0.4)]
    hover:scale-110
    transition-all duration-300
    border border-white/20
  "
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
        </svg>
      </a>
    </div>
  );
}
