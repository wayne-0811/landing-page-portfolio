import localFont from "next/font/local";

/**
 * Font loading
 * ------------------------------------------------------------------
 * The brief calls for Fontshare "Clash Display" (display) and
 * "General Sans" (body). Those families are distributed only through
 * Fontshare, which is not reachable from this build environment, so the
 * scaffold ships the closest self-hostable substitutes:
 *
 *   - display:  Space Grotesk Variable  (stand-in for Clash Display)
 *   - body:     Geist Variable          (stand-in for General Sans)
 *
 * Both are self-hosted variable woff2 files in /app/fonts and wired up
 * with next/font/local — so there is no layout shift and the weight is
 * preloaded.
 *
 * TO SWAP IN THE REAL FONTS LATER:
 *   1. Drop the Clash Display / General Sans woff2 files into /app/fonts.
 *   2. Point the `src` paths below at the new files.
 * Nothing else changes — the rest of the site references the CSS
 * variables `--font-display` / `--font-body`, never the family names.
 */

export const fontDisplay = localFont({
  src: [
    {
      path: "../app/fonts/space-grotesk-variable.woff2",
      // Variable font: supplies the full 600–700 range the brief asks for.
      weight: "300 700",
      style: "normal",
    },
  ],
  variable: "--ff-display",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
});

export const fontBody = localFont({
  src: [
    {
      path: "../app/fonts/geist-variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--ff-body",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
});
