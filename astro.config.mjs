import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://zander-portfolio.vercel.app',
  output: 'static',
  build: {
    format: 'directory'
  }
});
