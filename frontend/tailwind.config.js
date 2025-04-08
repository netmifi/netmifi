/* eslint-disable no-mixed-spaces-and-tabs */
/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js, jsx, ts,tsx}",
		"./components/**/*.{js, jsx, ts,tsx}",
		"./app/**/*.{js, jsx, ts,tsx}",
		"./src/**/*.{js, jsx, ts,tsx}",
	],
	prefix: "",
	theme: {
    	container: {
    		center: 'true',
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	extend: {
    		fontFamily: {
    			'dm-sans': ["Dm Sans", "sans-serif"],
    			poppins: ["Poppins", "sans-serif"],
    			montserrat: ["Montserrat", "sans-serif"],
    			'dancing-script': ["Dancing Script", "cursive"]
    		},
    		colors: {
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			'transparent-black': 'hsl(var(--transparent-black))',
    			red: {
    				DEFAULT: 'hsl(var(--red))',
    				foreground: 'hsl(var(--red-foreground))'
    			},
    			'low-red': {
    				DEFAULT: 'hsl(var(--low-red))',
    				foreground: 'hsl(var(--low-red-foreground))'
    			},
    			blue: {
    				DEFAULT: 'hsl(var(--blue))',
    				foreground: 'hsl(var(--blue-foreground))'
    			},
    			'high-contrast': {
    				DEFAULT: 'hsl(var(--high-contrast))',
    				foreground: 'hsl(var(--high-contrast-foreground))'
    			},
    			'low-contrast': {
    				DEFAULT: 'hsl(var(--low-contrast))',
    				foreground: 'hsl(var(--low-contrast-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
    			'caret-blink': {
    				'0%,70%,100%': {
    					opacity: '1'
    				},
    				'20%,50%': {
    					opacity: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			'caret-blink': 'caret-blink 1.25s ease-out infinite'
    		}
    	}
    },
	// eslint-disable-next-line no-undef
	plugins: [require("tailwindcss-animate")],
};
