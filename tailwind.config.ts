import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				blue: '#0A0192',
				neutral: '#CCCCCC'
			}
		}
	},

	plugins: []
} satisfies Config;
