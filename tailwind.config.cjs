const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		fontSize: {
			sm: '0.8rem',
			xl: '1.25rem',
			'2xl': '1.563rem',
			'3xl': '1.953rem',
			'4xl': '2.441rem',
			'5xl': '3.052rem',
			base: '1.25rem',
			title: '2.5rem',
			section: '1.75rem'
		},
		fontFamily: {
			header: ['"Karla Variable"', ...defaultTheme.fontFamily.sans],
			body: ['"Nunito Variable"', ...defaultTheme.fontFamily.sans],
			code: [...defaultTheme.fontFamily.mono]
		},
		extend: {},
	},
	plugins: [],
}
