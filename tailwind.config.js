/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			keyframes: {
				slideUp: {
					"0%": { transform: "translate(0, 30px)" },
					"100%": { transform: "translate(0, 0)" },
				},
				opacityUp: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
			},
			animation: {
				slideUp: "slideUp 0.3s ease-in-out",
				opacityUp: "opacityUp 0.3s ease-in-out",
			},
		},
	},
	plugins: [],
};
