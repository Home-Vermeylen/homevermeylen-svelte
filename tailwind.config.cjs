/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	daisyui: {
		themes: [
			{
				vermeylen: {
					primary: '#CCBAE6',

					secondary: '#D926AA',

					accent: '#4f2fa0',

					neutral: '#4a4453',

					'base-100': '#4a4453',

					info: '#5f9fcc',

					success: '#8bcebf',

					warning: '#ffda7d',

					error: '#f87171'
				}
			}
		]
	},

	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};

module.exports = config;
