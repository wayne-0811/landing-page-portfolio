// Placeholder award seal: a brass roundel with the year. Swap for the real
// awarding body's mark when one is supplied.
export function AwardSeal({ year, uid, size = 54 }) {
  const id = `seal-${uid}`;
  return (
    <svg className="seal" width={size} height={size} viewBox="0 0 54 54" aria-hidden="true" focusable="false">
      <defs>
        <path id={id} d="M27 27 m-19 0 a19 19 0 1 1 38 0 a19 19 0 1 1 -38 0" />
      </defs>
      <circle cx="27" cy="27" r="26" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="27" cy="27" r="14" fill="none" stroke="currentColor" strokeWidth="1" />
      <text fontSize="5.4" letterSpacing="1.4" fill="currentColor" fontFamily="var(--font-sans)">
        <textPath href={`#${id}`}>BLUE RIDGE BUILDING AWARDS ·</textPath>
      </text>
      <text x="27" y="30" textAnchor="middle" fontSize="8.5" fill="currentColor" fontFamily="var(--font-sans)">{year}</text>
    </svg>
  );
}
