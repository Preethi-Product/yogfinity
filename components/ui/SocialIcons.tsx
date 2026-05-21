interface IconProps {
  className?: string;
  size?: number;
}

export function InstagramIcon({ className = "", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className = "", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <path d="M22 8.5c0-1.5-1.2-2.7-2.7-2.9C16.8 5 12 5 12 5s-4.8 0-7.3.6C3.2 5.8 2 7 2 8.5 1.4 11 1.4 12 1.4 12s0 1 .6 3.5c0 1.5 1.2 2.7 2.7 2.9C7.2 19 12 19 12 19s4.8 0 7.3-.6c1.5-.2 2.7-1.4 2.7-2.9.6-2.5.6-3.5.6-3.5s0-1-.6-3.5z" />
      <polygon points="10,9.5 16,12 10,14.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SpotifyIcon({ className = "", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 14.36c-.2.32-.62.42-.94.22-2.56-1.56-5.78-1.92-9.58-1.04-.36.08-.72-.14-.8-.5-.08-.36.14-.72.5-.8 4.12-.94 7.7-.54 10.56 1.22.32.2.42.62.26.9zm1.2-2.68c-.24.4-.76.52-1.16.28-2.94-1.8-7.42-2.32-10.9-1.28-.44.12-.9-.14-1.02-.58-.12-.44.14-.9.58-1.02 3.96-1.14 8.9-.56 12.28 1.5.4.24.52.76.22 1.1zm.1-2.78C14.24 8.9 8.82 8.74 5.16 9.84c-.52.16-1.08-.12-1.24-.64-.16-.52.12-1.08.64-1.24 4.28-1.3 10.34-1.12 14.72 1.38.46.28.6.88.32 1.34-.28.46-.88.6-1.34.32z" />
    </svg>
  );
}
