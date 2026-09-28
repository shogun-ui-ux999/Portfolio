import { Link } from "react-router-dom";

/** Graceful fallback for stray paths. */
export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="museum-eyebrow">Exhibit Not Found</p>
      <h1 className="mt-4 font-serif text-5xl font-semibold text-paper-50">
        404
      </h1>
      <p className="mt-4 max-w-md text-paper-300">
        This door leads to a room that doesn&rsquo;t exist. Even museums have
        locked doors.
      </p>
      <Link to="/" className="btn-lamp mt-8">
        Return to the Entrance
      </Link>
    </div>
  );
}
