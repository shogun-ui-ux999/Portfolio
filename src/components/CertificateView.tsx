import { useEffect, useRef } from "react";
import type { EvidenceDetail } from "../data/artifacts";

/**
 * Certificate Evidence View — looks like a verified digital replica
 * of the official certificate, framed like an archival document.
 */
export default function CertificateView({
  detail,
  onClose,
}: {
  detail: EvidenceDetail;
  onClose: () => void;
}) {
  const cert = detail.certificate;
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => closeRef.current?.focus(), 60);
    return () => window.clearTimeout(t);
  }, []);

  // Block Escape from reaching the plaque underneath
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  if (!cert) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Verified evidence: ${cert.course}`}
      className="animate-fade-in fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-night-950/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-fade-up my-auto w-full max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-xl border border-museum-gold/50 bg-paper-50 p-[3px] shadow-[0_30px_90px_rgba(0,0,0,0.8)]">
          <div className="rounded-[9px] border-2 border-night-900/15 bg-paper-50 px-6 py-9 sm:px-12 sm:py-12">
            {/* Verified Evidence stamp */}
            <div className="flex justify-center">
              <span className="museum-label inline-flex -rotate-2 items-center gap-1.5 rounded-sm border-2 border-emerald-800/60 px-3 py-1.5 text-[0.55rem] text-emerald-800/90">
                <span aria-hidden className="text-sm leading-none">✓</span>
                Verified Evidence
              </span>
            </div>

            {/* Certificate header */}
            <p className="mt-6 text-center font-serif text-xs tracking-[0.4em] text-night-800/50 uppercase">
              {cert.title}
            </p>
            <div aria-hidden className="mx-auto mt-4 h-px w-24 bg-night-900/25" />

            {/* Name — prominent serif */}
            <p className="mt-8 text-center font-serif text-3xl text-night-900 italic sm:text-4xl">
              {cert.name}
            </p>
            <p className="mt-4 text-center text-sm text-night-800/70">
              has successfully completed the
            </p>
            <p className="mt-2 text-center font-serif text-xl font-semibold text-night-900 sm:text-2xl">
              {cert.course}
            </p>

            {/* Details grid */}
            <dl className="mt-9 space-y-3 border-t border-night-900/10 pt-6 text-center sm:text-left">
              <CertRow label="Issued by" value={cert.issuer} />
              <CertRow label="Completion date" value={cert.completionDate} />
              <CertRow label="Standards" value={cert.standards} />
              <CertRow label="Certified by" value={cert.certifiedBy} />
            </dl>

            {/* Signature flourish */}
            <div className="mt-8 flex items-end justify-between gap-6">
              <p className="font-hand text-2xl text-night-900/80 italic">
                {cert.certifiedBy.split(" ").slice(0, 3).join(" ")}
              </p>
              <p className="text-right text-[0.65rem] leading-snug text-night-800/50">
                Digital replica of the
                <br />
                original certificate
              </p>
            </div>
          </div>
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="museum-label mx-auto mt-5 block rounded-full border border-paper-400/30 px-6 py-2.5 text-[0.6rem] text-paper-200 transition-colors hover:border-amber-glow/60 hover:text-amber-glow"
        >
          Close Certificate
        </button>
      </div>
    </div>
  );
}

function CertRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-0.5 sm:grid-cols-[130px_1fr] sm:gap-3">
      <dt className="museum-label text-[0.5rem] text-night-800/50">{label}</dt>
      <dd className="text-[0.8rem] leading-relaxed text-night-900/85">{value}</dd>
    </div>
  );
}

