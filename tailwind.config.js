const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    mode: 'jit',
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#ea8025',
                invalid: '#e32c22',
                dark3e: '#3E4042',
            },
            fontFamily: {
                sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
            },
            boxShadow: {
                card: '0px 0px 13px 0px #00000040',
                card2: '0 4px 16px rgb(0 0 0 / 12%)',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
