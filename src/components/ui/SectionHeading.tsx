interface SectionHeadingProps {
  eyebrow: string;
  title?: string;
  align?: "center" | "left";
}

// The design uses one consistent header pattern for section labels
// ("— WHY CHOOSE BSH TAXI SERVICES —", "— OUR SERVICES —", "— OUR PREMIUM FLEET —"):
// a single bold, uppercase, letter-spaced line, centered, flanked by thin
// divider rules. There's no separate large title or underline bar beneath it.
// `title` is kept optional for any section that genuinely needs a bigger
// heading below the eyebrow — omit it to match the standard pattern.
export default function SectionHeading({ eyebrow, title, align = "center" }: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div className={`mb-10 flex flex-col ${isCentered ? "items-center text-center" : "items-start text-left"}`}>
      <div className="flex items-center gap-4">
        {isCentered && <span className="h-px w-12 bg-slate-300 sm:w-16" aria-hidden="true" />}
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-slate-900 sm:text-base">
          {eyebrow}
        </p>
        {isCentered && <span className="h-px w-12 bg-slate-300 sm:w-16" aria-hidden="true" />}
      </div>

      {title && (
        <>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
          <span className="mt-4 h-1 w-16 rounded-full bg-primary" />
        </>
      )}
    </div>
  );
}