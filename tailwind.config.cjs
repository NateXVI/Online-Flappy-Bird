/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#ffeda3',
					secondary: '#39a9cb',
					accent: '#000',
					neutral: '#2a2a2a',
					'base-100': '#191919',
					info: '#39a9cb',
					success: '#77dd77',
					warning: '#e66465',
					error: '#e65455'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
