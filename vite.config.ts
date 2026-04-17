import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub project page: https://<user>.github.io/<repo>/
// If you rename the repo, change this path to match.
const repoBase = '/personalitytest/';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? repoBase : '/',
}));
