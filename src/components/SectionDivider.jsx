export default function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center py-10 bg-white">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-brand/10" />
      <div className="relative flex items-center gap-4 px-6 bg-white">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-brand/30" />
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-brand/40 flex-shrink-0"
          fill="currentColor"
          aria-hidden="true"
        >
          <ellipse cx="12" cy="12" rx="5" ry="8" />
          <path d="M12 4 Q15 8 12 12 Q9 8 12 4Z" fill="white" opacity="0.6" />
        </svg>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-brand/30" />
      </div>
    </div>
  );
}
