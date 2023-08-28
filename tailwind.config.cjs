const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		fontFamily: {
			header: ['"Karla Variable"', ...defaultTheme.fontFamily.sans],
			body: ['"Nunito Variable"', ...defaultTheme.fontFamily.sans],
			code: [...defaultTheme.fontFamily.mono]
		},
		extend: {},
	},
	plugins: [],
}
