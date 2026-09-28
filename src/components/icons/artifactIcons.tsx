import type { JSX } from "react";

/**
 * Minimal stroke icons for each bedroom artifact hotspot.
 * Drawn on a 24×24 grid and inherit `currentColor`.
 */

interface IconProps {
  className?: string;
}

const base = "h-full w-full";

export function LaptopIcon({ className }: IconProps): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className ?? base}>
      <rect x="4" y="5" width="16" height="10" rx="1.5" />
      <path d="M2 19h20l-2-3H4l-2 3z" />
    </svg>
  );
}

export function NotebookIcon({ className }: IconProps): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className ?? base}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="M13 8h4M13 12h4M13 16h2" />
    </svg>
  );
}

export function CertificateIcon({ className }: IconProps): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className ?? base}>
      <rect x="4" y="6" width="14" height="12" rx="1.5" />
      <path d="M7 10h8M7 13h5" />
      <circle cx="17.5" cy="15.5" r="3.5" fill="currentColor" fillOpacity="0.2" />
      <path d="M16.2 18.5 15 21l2.5-1 2.5 1-1.2-2.5" />
    </svg>
  );
}

export function ErrorIcon({ className }: IconProps): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className ?? base}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9l3 3-3 3M12 15h5" />
    </svg>
  );
}

export function ChessIcon({ className }: IconProps): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className ?? base}>
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <path d="M4 12h16M12 4v16" />
      <path d="M14.5 8.5l2 2M9 16l1.5 1.5" />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className ?? base}>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 9h16M8 3v4M16 3v4" />
      <circle cx="12" cy="15" r="2.6" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className ?? base}>
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      <path d="M11 18h2" />
      <path d="M9.5 13.5l1.8-3.5 1.4 2.2 1.8-3.2" />
    </svg>
  );
}

export function LetterIcon({ className }: IconProps): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className ?? base}>
      <rect x="6" y="8" width="12" height="12" rx="1.5" />
      <path d="M8 8V6.5A4 4 0 0 1 16 6.5V8" />
      <path d="M9.5 13.5c1-1 2-1 2.5 0s1.5 1 2.5 0" />
    </svg>
  );
}

export function BraceletIcon({ className }: IconProps): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className ?? base}>
      <ellipse cx="12" cy="12" rx="7" ry="4.5" />
      <path d="M5.5 10.5L4 12l1.5 1.5M18.5 10.5L20 12l-1.5 1.5" />
    </svg>
  );
}

/** Lookup used by the hotspot renderer. */
export const artifactIcons: Record<string, (props: IconProps) => JSX.Element> = {
  laptop: LaptopIcon,
  notebook: NotebookIcon,
  certificates: CertificateIcon,
  "broken-code": ErrorIcon,
  chessboard: ChessIcon,
  "gap-year": CalendarIcon,
  mobile: PhoneIcon,
  "drawer-letter": LetterIcon,
  bracelet: BraceletIcon,
};
