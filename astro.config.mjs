// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	site: 'https://comercio-torices.vercel.app',
	integrations: [mdx(), sitemap(), react(), tailwind()],
	server: {
		host: true, // Escuchar en todas las interfaces de red
		port: 3012,
	},
	build: {
		// Optimizaciones para reducir uso de memoria
		inlineStylesheets: 'auto',
		assets: '_assets',
	},
	vite: {
		build: {
			// Configuración de Vite para optimizar memoria
			chunkSizeWarningLimit: 1000,
			rollupOptions: {
				output: {
					manualChunks: {
						vendor: ['react', 'react-dom'],
					},
				},
			},
		},
	},
});
