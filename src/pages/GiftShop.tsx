import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { giftShop } from "../data/artifacts";
import { VisitorUploadDropzone } from "../lib/uploadthing";
import { Typewriter } from "../components/motion";

/** The Gift Shop — warm, memorable end to the tour. */
export default function GiftShop() {
  const [pins, setPins] = useState<Array<{ name: string; url: string }>>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    const prev = document.title;
    document.title = "Gift Shop — Anchit's Museum";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <section className="relative mx-auto min-h-dvh max-w-3xl px-5 py-24 sm:px-6">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute top-10 left-1/2 h-72 w-[500px] -translate-x-1/2 rounded-full bg-gold/5 blur-3xl"
        style={{ filter: "blur(80px)" }}
      />

      {/* Header */}
      <div className="text-center">
        <p className="animate-fade-up text-[0.55rem] text-gold/70 tracking-[0.4em] uppercase [animation-delay:80ms]">
          The Exit
        </p>
        <h1 className="animate-fade-up mt-3 font-display text-4xl text-paper sm:text-5xl [animation-delay:200ms]">
          Gift Shop
        </h1>
        <p className="animate-fade-up mt-3 font-display text-lg text-paper/70 italic [animation-delay:320ms]">
          Take something with you.
        </p>
      </div>

      {/* Souvenir cards — slide in from sides */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {/* Email */}
        <a
          href={`mailto:${giftShop.email}`}
          className="animate-fade-left group flex flex-col rounded-2xl border border-white/5 bg-deep-800/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_18px_45px_rgba(0,0,0,0.5)]"
        >
          <span className="museum-label text-[0.5rem] text-gold/60">Correspondence</span>
          <span className="mt-3 flex items-center gap-2.5 font-display text-lg text-paper">
            <span aria-hidden className="text-gold">✉</span>
            Email the Curator
          </span>
          <span className="mt-1.5 text-sm break-all text-paper-faint/60">{giftShop.email}</span>
          <span className="museum-label mt-auto pt-5 text-[0.5rem] text-paper-faint/30 group-hover:text-gold">
            Write a letter →
          </span>
        </a>

        {/* Run club */}
        <a
          href={giftShop.runClubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="animate-fade-right group flex flex-col rounded-2xl border border-white/5 bg-deep-800/40 p-6 transition-all duration-300 [animation-delay:150ms] hover:-translate-y-1 hover:border-cyan/30 hover:shadow-[0_18px_45px_rgba(0,0,0,0.5)]"
        >
          <span className="museum-label text-[0.5rem] text-cyan/60">Built From Scratch</span>
          <span className="mt-3 flex items-center gap-2.5 font-display text-lg text-paper">
            <span aria-hidden className="text-cyan">✦</span>
            {giftShop.runClubLabel}
          </span>
          <span className="mt-1.5 text-sm break-all text-paper-faint/60">{giftShop.runClubUrl}</span>
          <span className="museum-label mt-auto pt-5 text-[0.5rem] text-paper-faint/30 group-hover:text-cyan">
            Visit the club →
          </span>
        </a>
      </div>

      {/* Downloads */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <a
          href="/assets/resume.pdf"
          download="Anchit-Aman-Resume.pdf"
          className="museum-label flex items-center justify-between rounded-2xl border border-dashed border-white/10 bg-deep-800/30 px-6 py-5 text-[0.6rem] text-paper-faint transition-colors duration-300 hover:border-gold/30 hover:text-gold"
        >
          Download Resume
          <span aria-hidden>↓</span>
        </a>
        <a
          href="/assets/museum-brochure.pdf"
          download="Anchits-Museum-Brochure.pdf"
          className="museum-label flex items-center justify-between rounded-2xl border border-dashed border-white/10 bg-deep-800/30 px-6 py-5 text-[0.6rem] text-paper-faint transition-colors duration-300 hover:border-cyan/30 hover:text-cyan"
        >
          Download Museum Brochure
          <span aria-hidden>↓</span>
        </a>
      </div>
      <p className="museum-label mt-3 text-center text-[0.5rem] text-paper-faint/30">
        Documents available upon request by email
      </p>

      {/* Visitors&apos; Wall — Uploadthing */}
      <div className="mt-16">
        <div className="text-center">
          <p className="museum-label text-[0.55rem] text-gold/60">
            Visitor Contributions
          </p>
          <h2 className="mt-3 font-display text-2xl text-paper sm:text-3xl">
            The Visitors&apos; Wall
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-display text-base text-paper/70 italic">
            Leave something on the desk — a photo, a sketch, a scanned
            keepsake. The curator files every contribution with the collection.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/5 bg-deep-800/40 p-6 sm:p-8">
          {import.meta.env.DEV ? (
            <VisitorUploadDropzone
              endpoint="visitorPin"
              className="ut-museum"
              appearance={{
                container:
                  "flex cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-white/10 bg-deep-800/30 px-6 py-10 text-center transition-colors duration-300 hover:border-cyan/30 hover:bg-deep-800/50",
                uploadIcon: "text-3xl",
                label: "mt-2 font-display text-lg text-paper",
                allowedContent:
                  "mt-1 museum-label text-[0.5rem] text-paper-faint/40",
                button:
                  "mt-4 rounded-full bg-cyan px-6 py-2.5 font-sans text-sm font-semibold text-deep-950 transition-transform duration-200 hover:scale-[1.03]",
              }}
              content={{
                uploadIcon: "📌",
                label: "Drop a keepsake on the desk, or click to choose",
                allowedContent: "Image or PDF · up to 8 MB each",
                button: "Pin it to the wall",
              }}
              onClientUploadComplete={(files) => {
                setPins((prev) => [
                  ...prev,
                  ...files.map((file) => ({
                    name: file.name,
                    url: file.ufsUrl,
                  })),
                ]);
                setUploadError(null);
              }}
              onUploadError={(error) => {
                setUploadError(
                  "The registrar couldn't accept that item. " + error.message,
                );
              }}
            />
          ) : (
            <div className="text-center">
              <p className="font-display text-lg text-paper">
                The registrar&apos;s desk is closed in this gallery.
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-paper-faint/65">
                Uploads are wired for the workshop preview — this static
                build has no registrar on duty. Email the curator to
                contribute instead.
              </p>
              <a
                href={`mailto:${giftShop.email}`}
                className="museum-label mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 px-6 py-3 text-[0.55rem] text-paper-faint transition-colors hover:border-gold/30 hover:text-gold"
              >
                <span aria-hidden>✉</span>
                Email the Curator
              </a>
            </div>
          )}

          {uploadError && (
            <p className="mt-4 text-center text-sm text-magenta">
              {uploadError}
            </p>
          )}

          {pins.length > 0 && (
            <div className="mt-6">
              <p className="museum-label text-left text-[0.5rem] text-gold/60">
                Recently pinned
              </p>
              <div className="mt-3 space-y-2">
                {pins.map((pin, index) => (
                  <div
                    key={`${pin.url}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-gold/20 bg-gold/5 px-4 py-3"
                  >
                    <span className="truncate text-sm text-paper">
                      📌 {pin.name}
                    </span>
                    <a
                      href={pin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="museum-label shrink-0 text-[0.5rem] text-cyan transition-colors hover:text-gold"
                    >
                      View →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="museum-label mt-6 text-center text-[0.5rem] text-paper-faint/30">
            One item per visit · Image or PDF · 8 MB max
          </p>
        </div>
      </div>

      {/* Closing — the curator types his farewell */}
      <div className="mt-16 text-center">
        <div
          aria-hidden
          className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />
        <p className="mx-auto mt-8 max-w-md font-display text-xl leading-relaxed text-paper/85 italic">
          <Typewriter text={`\u201C${giftShop.closingMessage}\u201D`} speedMs={34} />
        </p>
        <p className="mt-4 font-hand text-2xl text-gold/80">— Anchit</p>

        <Link
          to="/"
          className="museum-label mt-10 inline-flex items-center gap-2.5 rounded-full border border-white/10 px-6 py-3 text-[0.55rem] text-paper-faint transition-colors hover:border-gold/30 hover:text-gold"
        >
          <span aria-hidden>←</span>
          Back to the Entrance
        </Link>
      </div>
    </section>
  );
}
