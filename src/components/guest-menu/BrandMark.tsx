interface BrandMarkProps {
  className?: string;
}

/**
 * Minimal geometric bakery arch and wheat line emblem tailored to Lokal Fırın & Kahve.
 */
export function BrandMark({ className = "h-8 w-8" }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="1"
        y="1"
        width="34"
        height="34"
        stroke="#171714"
        strokeWidth="1.5"
      />
      <path
        d="M9 28V16.5C9 11.5294 13.0294 7.5 18 7.5C22.9706 7.5 27 11.5294 27 16.5V28"
        stroke="#171714"
        strokeWidth="1.5"
      />
      <path d="M5.5 28H30.5" stroke="#171714" strokeWidth="1.5" />
      <path d="M18 12V24.5" stroke="#171714" strokeWidth="1.35" />
      <path
        d="M18 15.5C15.8 14.9 14.3 13.7 13.7 12.1C15.5 12.2 17 13.4 18 15.5Z"
        stroke="#171714"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M18 15.5C20.2 14.9 21.7 13.7 22.3 12.1C20.5 12.2 19 13.4 18 15.5Z"
        stroke="#171714"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M18 20.5C15.6 19.9 14 18.6 13.3 16.9C15.3 17 16.9 18.3 18 20.5Z"
        stroke="#171714"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M18 20.5C20.4 19.9 22 18.6 22.7 16.9C20.7 17 19.1 18.3 18 20.5Z"
        stroke="#171714"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
