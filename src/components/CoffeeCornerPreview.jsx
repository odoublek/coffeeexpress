// src/components/CoffeeCornerPreview.jsx

import { useState, useRef, useEffect, useCallback } from "react";
import cornerSetupImg from "../assets/a1.png";

const STEPS = [
  { n: "01", label: "Fotoğraf Yükle" },
  { n: "02", label: "Yerleştir"       },
  { n: "03", label: "Paylaş"          },
];

export default function CoffeeCornerPreview({ onClose }) {
  const [step, setStep]             = useState(1);
  const [bgSrc, setBgSrc]           = useState(null);
  const [overlayPos, setOverlayPos] = useState({ x: 28, y: 28 });
  const [overlaySize, setOverlaySize] = useState(38);
  const [isDragOver, setIsDragOver] = useState(false);

  const containerRef = useRef(null);
  const isDragging   = useRef(false);
  const dragStart    = useRef({ mx: 0, my: 0, ox: 0, oy: 0 });

  /* ── dosya ── */
  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => { setBgSrc(e.target.result); setStep(2); };
    reader.readAsDataURL(file);
  };
  const onFileInput = (e) => handleFile(e.target.files[0]);
  const onDrop      = (e) => { e.preventDefault(); setIsDragOver(false); handleFile(e.dataTransfer.files[0]); };

  /* ── mouse drag ── */
  const onMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
    dragStart.current  = { mx: e.clientX, my: e.clientY, ox: overlayPos.x, oy: overlayPos.y };
  };
  const onMouseMove = useCallback((e) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dx   = ((e.clientX - dragStart.current.mx) / rect.width)  * 100;
    const dy   = ((e.clientY - dragStart.current.my) / rect.height) * 100;
    setOverlayPos({
      x: Math.max(0, Math.min(100 - overlaySize, dragStart.current.ox + dx)),
      y: Math.max(0, Math.min(92,                dragStart.current.oy + dy)),
    });
  }, [overlaySize]);
  const onMouseUp = () => { isDragging.current = false; };

  /* ── touch drag ── */
  const onTouchStart = (e) => {
    const t = e.touches[0];
    isDragging.current = true;
    dragStart.current  = { mx: t.clientX, my: t.clientY, ox: overlayPos.x, oy: overlayPos.y };
  };
  const onTouchMove = useCallback((e) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const t    = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const dx   = ((t.clientX - dragStart.current.mx) / rect.width)  * 100;
    const dy   = ((t.clientY - dragStart.current.my) / rect.height) * 100;
    setOverlayPos({
      x: Math.max(0, Math.min(100 - overlaySize, dragStart.current.ox + dx)),
      y: Math.max(0, Math.min(92,                dragStart.current.oy + dy)),
    });
  }, [overlaySize]);
  const onTouchEnd = () => { isDragging.current = false; };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup",   onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend",  onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend",  onTouchEnd);
    };
  }, [onMouseMove, onTouchMove]);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  /* ── indir ── */
  const handleDownload = () => {
    const bgImg = containerRef.current?.querySelector("img.bg-img");
    const ovImg = containerRef.current?.querySelector("img.ov-img");
    if (!bgImg || !ovImg) return;

    const cw = bgImg.naturalWidth, ch = bgImg.naturalHeight;
    const canvas = document.createElement("canvas");
    canvas.width = cw; canvas.height = ch;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(bgImg, 0, 0, cw, ch);

    const bgRect = bgImg.getBoundingClientRect();
    const sx = cw / bgRect.width, sy = ch / bgRect.height;
    const ox = (overlayPos.x / 100) * bgRect.width  * sx;
    const oy = (overlayPos.y / 100) * bgRect.height * sy;
    const ow = (overlaySize  / 100) * bgRect.width  * sx;
    const oh = ow * (ovImg.naturalHeight / ovImg.naturalWidth);

    ctx.globalAlpha = 0.95;
    ctx.drawImage(ovImg, ox, oy, ow, oh);
    ctx.globalAlpha = 1;

    const fs = Math.round(cw * 0.016);
    ctx.font      = `600 ${fs}px sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.textAlign = "right";
    ctx.fillText("coffeeexpress.com.tr", cw - 20, ch - 20);

    const link    = document.createElement("a");
    link.download = "coffee-corner-preview.jpg";
    link.href     = canvas.toDataURL("image/jpeg", 0.93);
    link.click();

    setStep(3);
  };

  const reset = () => {
    setBgSrc(null);
    setStep(1);
    setOverlayPos({ x: 28, y: 28 });
    setOverlaySize(38);
  };

  /* ────────────────────────────── JSX ────────────────────────────── */
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-5"
      style={{ background: "rgba(8,16,22,0.94)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[660px] rounded-[28px] overflow-hidden flex flex-col"
        style={{
          background: "linear-gradient(155deg,#0d2030 0%,#162d3e 60%,#0f2230 100%)",
          border:     "1px solid rgba(255,255,255,0.07)",
          boxShadow:  "0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ═══ HEADER ═══ */}
        <div className="relative px-6 sm:px-8 pt-6 sm:pt-8 pb-5">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-white/80 hover:bg-white/8 transition text-[15px]"
          >✕</button>

          <div className="flex items-start gap-4">
            {/* kahve ikonu */}
            <div
              className="mt-0.5 w-10 h-10 rounded-xl flex items-center justify-center text-[18px] flex-shrink-0"
              style={{ background: "rgba(196,122,58,0.15)", border: "1px solid rgba(196,122,58,0.3)" }}
            >☕</div>
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#c47a3a] mb-0.5">
                Coffee Corner Simülatörü
              </p>
              <h2 className="font-serif text-white text-[20px] sm:text-[24px] font-light leading-tight">
                Mekanınıza Nasıl Yakışır?
              </h2>
              <p className="font-sans text-white/40 text-[12px] mt-1 leading-relaxed">
                Kendi fotoğrafınıza yerleştirin, anında görün.
              </p>
            </div>
          </div>

          {/* adım çubuğu */}
          <div className="flex items-center mt-6">
            {STEPS.map((s, i) => {
              const active = step === i + 1;
              const done   = step >  i + 1;
              return (
                <div key={s.n} className="flex items-center flex-1 last:flex-none">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center font-sans text-[10px] font-bold transition-all duration-400"
                      style={{
                        background: done   ? "#c47a3a"
                                  : active ? "rgba(196,122,58,0.18)"
                                  :          "rgba(255,255,255,0.05)",
                        border: `1.5px solid ${done || active ? "#c47a3a" : "rgba(255,255,255,0.1)"}`,
                        color:  done   ? "#fff"
                               : active ? "#c47a3a"
                               :          "rgba(255,255,255,0.25)",
                      }}
                    >
                      {done ? "✓" : s.n}
                    </div>
                    <span
                      className="font-sans text-[10px] uppercase tracking-[0.12em] hidden sm:block transition-all duration-300"
                      style={{ color: active ? "rgba(255,255,255,0.8)" : done ? "#c47a3a" : "rgba(255,255,255,0.25)" }}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className="flex-1 h-px mx-3 rounded-full transition-all duration-500"
                      style={{ background: done ? "rgba(196,122,58,0.6)" : "rgba(255,255,255,0.08)" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══ BODY ═══ */}
        <div className="px-6 sm:px-8 pb-7 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "62vh" }}>

          {/* ─── ADIM 1: Upload ─── */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              {/* büyük upload alanı */}
              <label
                className="relative flex flex-col items-center justify-center gap-4 rounded-2xl cursor-pointer transition-all duration-200 min-h-[200px] sm:min-h-[230px]"
                style={{
                  border:     `2px dashed ${isDragOver ? "#c47a3a" : "rgba(255,255,255,0.12)"}`,
                  background: isDragOver ? "rgba(196,122,58,0.06)" : "rgba(255,255,255,0.02)",
                }}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={onDrop}
              >
                <input type="file" accept="image/*" className="hidden" onChange={onFileInput} />

                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-[28px] transition-transform duration-200"
                  style={{
                    background: isDragOver ? "rgba(196,122,58,0.2)" : "rgba(196,122,58,0.1)",
                    border:     "1px solid rgba(196,122,58,0.25)",
                    transform:  isDragOver ? "scale(1.08)" : "scale(1)",
                  }}
                >
                  📷
                </div>

                <div className="text-center px-4">
                  <p className="font-sans text-white/80 text-[15px] font-medium">
                    Mekan fotoğrafınızı yükleyin
                  </p>
                  <p className="font-sans text-white/30 text-[12px] mt-1.5 leading-relaxed">
                    Ofisiniz, restoranınız, oteliniz — nereye kurmak istediğinizi düşünün
                  </p>
                </div>

                <div
                  className="px-7 py-2.5 rounded-full font-sans text-[11px] uppercase tracking-[0.22em] font-bold transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "#c47a3a",
                    color:      "#fff",
                    boxShadow:  "0 6px 20px rgba(196,122,58,0.4)",
                  }}
                >
                  Fotoğraf Seç
                </div>

                <p className="font-sans text-white/55 text-[11px]">veya sürükleyip bırakın</p>
              </label>

              {/* önizleme ipucu */}
              <div
                className="flex items-center gap-3 rounded-2xl p-4"
                style={{ background: "rgba(196,122,58,0.07)", border: "1px solid rgba(196,122,58,0.15)" }}
              >
                <span className="text-[20px]">💡</span>
                <p className="font-sans text-[12px] text-white/55 leading-relaxed">
                  En iyi sonuç için mekanınızın <strong className="text-white/75">geniş açı</strong> ve <strong className="text-white/75">iyi aydınlatılmış</strong> bir fotoğrafını kullanın.
                </p>
              </div>
            </div>
          )}

          {/* ─── ADIM 2: Editor ─── */}
          {step === 2 && (
            <div className="flex flex-col gap-4">

              {/* canvas */}
              <div
                ref={containerRef}
                className="relative w-full rounded-2xl overflow-hidden select-none"
                style={{ background: "#000", minHeight: "180px" }}
              >
                <img
                  src={bgSrc}
                  alt="Mekan"
                  className="bg-img w-full h-auto block pointer-events-none"
                  draggable={false}
                />

                <img
                  src={cornerSetupImg}
                  alt="Coffee Corner"
                  className="ov-img absolute select-none"
                  draggable={false}
                  style={{
                    left:        `${overlayPos.x}%`,
                    top:         `${overlayPos.y}%`,
                    width:       `${overlaySize}%`,
                    cursor:      "grab",
                    filter:      "drop-shadow(0 16px 40px rgba(0,0,0,0.65))",
                    touchAction: "none",
                  }}
                  onMouseDown={onMouseDown}
                  onTouchStart={onTouchStart}
                />

                {/* hint */}
                <div
                  className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-[10px] text-white/65 pointer-events-none"
                  style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span>✥</span> Sürükleyerek konumlandırın
                </div>
              </div>

              {/* boyut kontrolü */}
              <div
                className="rounded-xl p-4 flex flex-col gap-2"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex justify-between">
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">Corner Boyutu</span>
                  <span className="font-sans text-[11px] text-white/60">{overlaySize}%</span>
                </div>
                <input
                  type="range" min="12" max="75" value={overlaySize}
                  onChange={(e) => setOverlaySize(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[#c47a3a]"
                  style={{ height: "4px" }}
                />
                <div className="flex justify-between font-sans text-[9px] text-white/20">
                  <span>Küçük</span><span>Büyük</span>
                </div>
              </div>

              {/* butonlar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 rounded-full py-3.5 font-sans text-[12px] uppercase tracking-[0.2em] font-bold transition hover:-translate-y-0.5"
                  style={{ background: "#c47a3a", color: "#fff", boxShadow: "0 8px 28px rgba(196,122,58,0.4)" }}
                >
                  ⬇ Görseli Kaydet
                </button>
                <a
                  href="https://wa.me/905051889080?text=Merhaba%2C%20Coffee%20Corner%20kurmak%20istiyorum!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-full py-3.5 font-sans text-[12px] uppercase tracking-[0.2em] font-bold transition hover:-translate-y-0.5"
                  style={{ background: "#25D366", color: "#fff", boxShadow: "0 8px 28px rgba(37,211,102,0.3)" }}
                >
                  💬 Teklif Al
                </a>
              </div>

              <label className="flex items-center justify-center gap-2 cursor-pointer font-sans text-[10px] uppercase tracking-[0.18em] text-white/25 hover:text-white/50 transition py-1">
                <input type="file" accept="image/*" className="hidden" onChange={onFileInput} />
                🔄 Farklı fotoğraf dene
              </label>
            </div>
          )}

          {/* ─── ADIM 3: Tebrik ─── */}
          {step === 3 && (
            <div className="flex flex-col items-center text-center gap-5 py-4">

              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-[34px]"
                style={{ background: "rgba(196,122,58,0.12)", border: "2px solid rgba(196,122,58,0.5)" }}
              >
                ✓
              </div>

              <div>
                <h3 className="font-serif text-white text-[22px] sm:text-[24px] font-light">
                  Harika görünüyor!
                </h3>
                <p className="font-sans text-white/45 text-[13px] mt-2 max-w-[340px] mx-auto leading-[1.7]">
                  Görseliniz kaydedildi. Şimdi ekibimizle paylaşın, size özel kurulum paketini konuşalım.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <a
                  href="https://wa.me/905051889080?text=Merhaba!%20Coffee%20Corner%20simülatöründen%20görsel%20hazırladım%2C%20kurulum%20bilgisi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-full py-3.5 font-sans text-[12px] uppercase tracking-[0.2em] font-bold transition hover:-translate-y-0.5"
                  style={{ background: "#25D366", color: "#fff", boxShadow: "0 8px 24px rgba(37,211,102,0.3)" }}
                >
                  💬 WhatsApp'tan Ulaş
                </a>
                <button
                  onClick={reset}
                  className="flex-1 flex items-center justify-center gap-2 rounded-full py-3.5 font-sans text-[12px] uppercase tracking-[0.2em] font-semibold transition hover:-translate-y-0.5"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  🔄 Yeniden Dene
                </button>
              </div>

              <p className="font-sans text-[10px] text-white/18 leading-relaxed">
                Bu görsel yalnızca fikir vermek amaçlıdır. Gerçek kurulum profesyonel ekibimizce yapılır.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}