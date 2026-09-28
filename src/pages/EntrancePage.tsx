import { Link } from "react-router-dom";

/**
 * PAGE 1 — THE ENTRANCE
 * The ticket hall: sets the tone, offers three ways in.
 */
export default function EntrancePage() {
  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-6 py-20 text-center">
      {/* Soft lamp pool above the title */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-amber-lamp/10 blur-[120px]"
      />

      <p className="museum-eyebrow">Permanent Collection — Est. 2007</p>

      <h1 className="mt-6 font-serif text-5xl font-semibold leading-tight tracking-tight text-paper-50 sm:text-7xl">
        Anchit&rsquo;s <span className="italic text-amber-glow text-glow-amber">Museum</span>
      </h1>

      <div className="gold-rule mt-8" aria-hidden />

      <p className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-paper-200 sm:text-xl">
        A self-guided tour of my work, failures, curiosity, and the gap year
        that changed everything.
      </p>

      <p className="mt-6 max-w-xl font-hand text-2xl leading-snug text-paper-300/90 sm:text-[1.7rem]">
        &ldquo;Instead of telling you who I am, I collected the objects that
        prove it.&rdquo;
      </p>

      {/* Three ways in — tour and artifact list arrive in Prompt 2 */}
      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
        <Link to="/bedroom" className="btn-lamp">
          Enter the Bedroom
        </Link>
        <Link to="/failures" className="btn-ghost">
          Visit the Museum of Failures
        </Link>
        <Link to="/curator" className="btn-ghost">
          Read the Curator&rsquo;s Note
        </Link>
      </div>

      <p className="mt-16 font-type text-[0.65rem] uppercase tracking-[0.3em] text-paper-400/60">
        Open late — every night
      </p>
    </div>
  );
}
