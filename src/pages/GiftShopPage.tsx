/**
 * PAGE 5 — THE GIFT SHOP (CONTACT & LINKS)
 * "Take something with you." Resume download is wired in a
 * later prompt once the file exists.
 */
export default function GiftShopPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8">
      <div className="text-center">
        <p className="museum-eyebrow">Exit Through</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-paper-50 sm:text-5xl">
          The Gift Shop
        </h1>
        <p className="mt-4 text-lg text-paper-300">Take something with you.</p>
      </div>

      <div className="gold-rule mt-10" aria-hidden />

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Email */}
        <a
          href="mailto:anchitaman00@gmail.com"
          className="museum-card group p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber-lamp/40"
        >
          <p className="font-type text-[0.65rem] uppercase tracking-[0.3em] text-amber-lamp/80">
            Correspondence
          </p>
          <p className="mt-3 font-serif text-xl font-semibold text-paper-100 group-hover:text-amber-glow">
            Email the Curator
          </p>
          <p className="mt-1 break-all text-sm text-paper-300">
            anchitaman00@gmail.com
          </p>
        </a>

        {/* Run club */}
        <a
          href="https://rushranchi.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="museum-card group p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber-lamp/40"
        >
          <p className="font-type text-[0.65rem] uppercase tracking-[0.3em] text-amber-lamp/80">
            Exhibit 01, continued
          </p>
          <p className="mt-3 font-serif text-xl font-semibold text-paper-100 group-hover:text-amber-glow">
            Rush Ranchi — Run Club
          </p>
          <p className="mt-1 break-all text-sm text-paper-300">
            rushranchi.vercel.app
          </p>
        </a>
      </div>

      <div className="mt-14 text-center">
        <p className="font-hand text-3xl leading-snug text-paper-200">
          &ldquo;Thanks for visiting my room. The next chapter is currently
          being coded.&rdquo;
        </p>
      </div>
    </div>
  );
}
