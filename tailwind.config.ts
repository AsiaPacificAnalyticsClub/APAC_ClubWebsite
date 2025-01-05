import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			zentry: [
  				'zentry',
  				'sans-serif'
  			],
  			general: [
  				'general',
  				'sans-serif'
  			],
  			'circular-web': [
  				'circular-web',
  				'sans-serif'
  			],
  			'robert-medium': [
  				'robert-medium',
  				'sans-serif'
  			],
  			'robert-regular': [
  				'robert-regular',
  				'sans-serif'
  			]
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
      }
  	}
  },
  plugins: [],
};
export default config;
