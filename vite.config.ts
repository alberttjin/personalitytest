import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Production uses a relative base so assets work on both:
 * - Custom domain (site at `/`, files at `./assets/...`)
 * - GitHub project URL (site at `/personalitytest/`, same relative `./assets/...`)
 *
 * Route prefix for `/quiz`, `/type/…` is resolved at runtime in `urlRoutes.ts`.
 */
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? './' : '/',
}));
