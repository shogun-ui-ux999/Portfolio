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
      {/* Header */}
      <div className="text-center">
        <p className="museum-label text-[0.6rem] text-museum-gold/80">The Exit</p>
        <h1 className="mt-3 font-serif text-4xl text-paper-50 sm:text-5xl">Gift Shop</h1>
        <p className="mt-3 font-serif text-lg text-paper-200/75 italic">
          Take something with you.
        </p>
      </div>

      {/* Souvenir cards — slide onto the shelf from both sides */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {/* Email */}
        <a
          href={`mailto:${giftShop.email}`}
          className="animate-fade-left group flex flex-col rounded-2xl border border-paper-400/15 bg-night-800/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-museum-gold/45 hover:shadow-[0_18px_45px_rgba(0,0,0,0.5)]"
        >
          <span className="museum-label text-[0.5rem] text-museum-gold/80">Correspondence</span>
          <span className="mt-3 flex items-center gap-2.5 font-serif text-lg text-paper-50">
            <span aria-hidden className="text-museum-gold">✉</span>
            Email the Curator
          </span>
          <span className="mt-1.5 text-sm break-all text-paper-300/70">{giftShop.email}</span>
          <span className="museum-label mt-auto pt-5 text-[0.5rem] text-paper-300/40 group-hover:text-museum-gold">
            Write a letter →
          </span>
        </a>

        {/* Run club */}
        <a
          href={giftShop.runClubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="animate-fade-right group flex flex-col rounded-2xl border border-paper-400/15 bg-night-800/40 p-6 transition-all duration-300 [animation-delay:150ms] hover:-translate-y-1 hover:border-amber-glow/45 hover:shadow-[0_18px_45px_rgba(0,0,0,0.5)]"
        >
          <span className="museum-label text-[0.5rem] text-amber-glow/80">Built From Scratch</span>
          <span className="mt-3 flex items-center gap-2.5 font-serif text-lg text-paper-50">
            <span aria-hidden className="text-amber-glow">✦</span>
            {giftShop.runClubLabel}
          </span>
          <span className="mt-1.5 text-sm break-all text-paper-300/70">{giftShop.runClubUrl}</span>
          <span className="museum-label mt-auto pt-5 text-[0.5rem] text-paper-300/40 group-hover:text-amber-glow">
            Visit the club →
          </span>
        </a>
      </div>

      {/* Downloads */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <a
          href="/assets/resume.pdf"
          download="Anchit-Aman-Resume.pdf"
          className="museum-label flex items-center justify-between rounded-2xl border border-dashed border-paper-400/25 bg-night-800/30 px-6 py-5 text-[0.6rem] text-paper-200 transition-colors duration-300 hover:border-amber-glow/40 hover:text-amber-glow"
        >
          Download Resume
          <span aria-hidden>↓</span>
        </a>
        <a
          href="/assets/museum-brochure.pdf"
          download="Anchits-Museum-Brochure.pdf"
          className="museum-label flex items-center justify-between rounded-2xl border border-dashed border-paper-400/25 bg-night-800/30 px-6 py-5 text-[0.6rem] text-paper-200 transition-colors duration-300 hover:border-museum-gold/40 hover:text-museum-gold"
        >
          Download Museum Brochure
          <span aria-hidden>↓</span>
        </a>
      </div>
      <p className="museum-label mt-3 text-center text-[0.5rem] text-paper-300/40">
        Documents available upon request by email
      </p>

      {/* Visitors' Wall — Uploadthing */}
      <div className="mt-16">
        <div className="text-center">
          <p className="museum-label text-[0.6rem] text-museum-gold/80">
            Visitor Contributions
          </p>
          <h2 className="mt-3 font-serif text-2xl text-paper-50 sm:text-3xl">
            The Visitors&rsquo; Wall
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-serif text-base text-paper-200/75 italic">
            Leave something on the desk — a photo, a sketch, a scanned
            keepsake. The curator files every contribution with the collection.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-paper-400/15 bg-night-800/40 p-6 sm:p-8">
          {import.meta.env.DEV ? (
            <VisitorUploadDropzone
              endpoint="visitorPin"
              className="ut-museum"
              appearance={{
                container:
                  "flex cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-paper-400/25 bg-night-800/30 px-6 py-10 text-center transition-colors duration-300 hover:border-amber-glow/50 hover:bg-night-800/50",
                uploadIcon: "text-3xl",
                label: "mt-2 font-serif text-lg text-paper-50",
                allowedContent:
                  "mt-1 museum-label text-[0.5rem] text-paper-300/50",
                button: "mt-4 rounded-full bg-amber-glow px-6 py-2.5 font-sans text-sm font-semibold text-night-950 transition-transform duration-200 hover:scale-[1.03]",
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
              <p className="font-serif text-lg text-paper-50">
                The registrar&rsquo;s desk is closed in this gallery.
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-paper-300/70">
                Uploads are wired for the workshop preview — this static
                build has no registrar on duty. Email the curator to
                contribute instead.
              </p>
              <a
                href={`mailto:${giftShop.email}`}
                className="museum-label mt-6 inline-flex items-center gap-2.5 rounded-full border border-paper-400/25 px-6 py-3 text-[0.55rem] text-paper-300 transition-colors hover:border-amber-glow/40 hover:text-amber-glow"
              >
                <span aria-hidden>✉</span>
                Email the Curator
              </a>
            </div>
          )}

          {uploadError && (
            <p className="mt-4 text-center text-sm text-fail-red">
              {uploadError}
            </p>
          )}

          {pins.length > 0 && (
            <div className="mt-6">
              <p className="museum-label text-left text-[0.5rem] text-museum-gold/80">
                Recently pinned
              </p>
              <div className="mt-3 space-y-2">
                {pins.map((pin, index) => (
                  <div
                    key={`${pin.url}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-museum-gold/25 bg-museum-gold/5 px-4 py-3"
                  >
                    <span className="truncate text-sm text-paper-100">
                      📌 {pin.name}
                    </span>
                    <a
                      href={pin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="museum-label shrink-0 text-[0.5rem] text-amber-glow transition-colors hover:text-museum-gold"
                    >
                      View →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="museum-label mt-6 text-center text-[0.5rem] text-paper-300/40">
            One item per visit · Image or PDF · 8 MB max
          </p>
        </div>
      </div>

      {/* Closing — the curator types his farewell */}
      <div className="mt-16 text-center">
        <div aria-hidden className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-museum-gold/50 to-transparent" />
        <p className="mx-auto mt-8 max-w-md font-serif text-xl leading-relaxed text-paper-100/90 italic">
          <Typewriter text={`"${giftShop.closingMessage}"`} speedMs={34} />
        </p>
        <p className="mt-4 font-hand text-2xl text-amber-glow/85">— Anchit</p>

        <Link
          to="/"
          className="museum-label mt-10 inline-flex items-center gap-2.5 rounded-full border border-paper-400/25 px-6 py-3 text-[0.55rem] text-paper-300 transition-colors hover:border-museum-gold/40 hover:text-museum-gold"
        >
          <span aria-hidden>←</span>
          Back to the Entrance
        </Link>
      </div>
    </section>
  );
}
