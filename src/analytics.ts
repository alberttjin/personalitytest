/**
 * Google Analytics 4 (gtag). Override with env `VITE_GA_MEASUREMENT_ID` if needed.
 * No backend required — events go to Google’s endpoints from the browser.
 */

/** Prefer env at build time; GitHub Actions sets empty string when var is unset — `??` would keep "" and disable GA. */
const GA_ID =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim() ||
  'G-QTTDSRKD8G';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fallback only: `index.html` includes the official Google tag so setup tools see it.
 * If that ran first, `window.gtag` exists — do not load gtag.js twice.
 */
export function initAnalytics(): void {
  if (!GA_ID || typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    (window.dataLayer as unknown[]).push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: false });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(script);
}

/** SPA navigations (pushState). Call after the URL reflects the new screen. */
export function trackSpaPageView(): void {
  if (!GA_ID || !window.gtag) return;
  const path = window.location.pathname + window.location.search + window.location.hash;
  window.gtag('event', 'page_view', {
    send_to: GA_ID,
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/** Fire once when the quiz resolves to a three-letter archetype code. */
export function trackQuizResult(archetypeCode: string): void {
  if (!GA_ID || !window.gtag) return;
  window.gtag('event', 'quiz_complete', {
    send_to: GA_ID,
    archetype_code: archetypeCode,
  });
}
