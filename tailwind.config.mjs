/** @type {import('tailwindcss').Config} */
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/postcss';
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
  integrations: [tailwind()],
}


