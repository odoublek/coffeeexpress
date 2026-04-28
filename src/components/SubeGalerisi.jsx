import { useState, useEffect, useCallback, useRef } from "react";
import panoramikImg from "../assets/panoramik.jpg";
import subeDis from "../assets/subedis.jpg";
import subeIc1 from "../assets/subeic1.jpg";
import subeIci from "../assets/subeici.jpg";

const PHOTOS = [
  { src: panoramikImg, alt: "Coffee Express şube panoramik görünüm" },
  { src: subeDis,      alt: "Coffee Express şube dış cephe görünümü" },
  { src: subeIc1,      alt: "Coffee Express şube iç mekan görünümü" },
  { src: subeIci,      alt: "Coffee Express şube iç mekan detay" },
];

const INTERVAL_MS = 5000;
const FADE_MS = 300;

export default function SubeGalerisi() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const intervalRef = useRef(null);
  const fadeTimeoutRef = useRef(null);
  const mountedRef = useRef(true);

  const swapTo = useCallback((nextIndexResolver) => {
    if (fadeTimeoutRef.current) return;
    setFading(true);
    fadeTimeoutRef.current = setTimeout(() => {
      if (!mountedRef.current) return;
      setActive(nextIndexResolver);
      setFading(false);
      fadeTimeoutRef.current = null;
    }, FADE_MS);
  }, []);

  const advance = useCallback(() => {
    swapTo((prev) => (prev + 1) % PHOTOS.length);
  }, [swapTo]);

  const resetInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(advance, INTERVAL_MS);
  }, [advance]);

  useEffect(() => {
    mountedRef.current = true;
    intervalRef.current = setInterval(advance, INTERVAL_MS);
    return () => {
      mountedRef.current = false;
      clearInterval(intervalRef.current);
      clearTimeout(fadeTimeoutRef.current);
    };
  }, [advance]);

  const handleSelect = (index) => {
    if (index === active || fading) return;
    swapTo(() => index);
    resetInterval();
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-10 py-16 sm:py-24">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-brand font-light leading-[1.08] tracking-[-0.02em] text-[clamp(34px,4vw,56px)]">
            Şubelerimizden <span className="italic">Kareler</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-14 bg-brand/30" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative w-full aspect-[21/8] overflow-hidden rounded-3xl border border-brand/10 bg-brand/5 shadow-[0_10px_40px_var(--tw-shadow-color)] shadow-brand/10">
            <img
              src={PHOTOS[active].src}
              alt={PHOTOS[active].alt}
              loading="eager"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                fading ? "opacity-0" : "opacity-100"
              }`}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/30 to-transparent" />

            <div className="absolute bottom-4 right-5 flex gap-2">
              {PHOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  aria-label={`${i + 1}. görsele geç`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i
                      ? "w-6 bg-white"
                      : "w-1.5 bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {PHOTOS.slice(1).map((photo, i) => {
              const photoIndex = i + 1;
              const isActive = active === photoIndex;
              return (
                <button
                  key={photoIndex}
                  type="button"
                  onClick={() => handleSelect(photoIndex)}
                  aria-label={photo.alt}
                  className={`relative aspect-[4/3] min-h-11 overflow-hidden rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand/40 ${
                    isActive
                      ? "border-brand/60 ring-2 ring-brand/25 scale-[0.98]"
                      : "border-brand/10 opacity-65 hover:opacity-90 hover:scale-[0.99]"
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
