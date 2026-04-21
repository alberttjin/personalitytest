/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GA4 Measurement ID (G-XXXXXXXXXX). Optional; omit for no analytics. */
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
