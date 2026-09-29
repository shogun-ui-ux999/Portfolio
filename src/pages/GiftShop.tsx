import { useEffect } from "react";
import { Link } from "react-router-dom";
import { giftShop } from "../data/artifacts";

/** The Gift Shop — warm, memorable end to the tour. */
export default function GiftShop() {
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

      {/* Souvenir cards */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {/* Email */}
        <a
          href={`mailto:${giftShop.email}`}
          className="group flex flex-col rounded-2xl border border-paper-400/15 bg-night-800/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-museum-gold/45 hover:shadow-[0_18px_45px_rgba(0,0,0,0.5)]"
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
          className="group flex flex-col rounded-2xl border border-paper-400/15 bg-night-800/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-glow/45 hover:shadow-[0_18px_45px_rgba(0,0,0,0.5)]"
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

      {/* Closing */}
      <div className="mt-16 text-center">
        <div aria-hidden className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-museum-gold/50 to-transparent" />
        <p className="mx-auto mt-8 max-w-md font-serif text-xl leading-relaxed text-paper-100/90 italic">
          "{giftShop.closingMessage}"
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
