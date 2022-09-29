module.exports = {
  content: [
    './src/**/*.{html,md,liquid,erb,serb}',
    './frontend/javascript/**/*.js',
  ],
  mode: 'jit',
  theme: {
    extend: {
      backgroundImage: {
        "hero": "url('/images/hero-header.jpg')"
      },
      colors: {
        brand: {
          purple: {
            100: '#ebe1f4',
            200: '#cdb5e3',
            300: '#a579cd',
            400: '#7c42b3',
            500: '#532c77',
            600: '#3e2159',
          },
          yellow: {
            100: '#fff8db',
            200: '#ffec9e',
            300: '#ffd83d',
            400: '#fac800',
            500: '#c79f00',
            600: '#7f6600'

          },
          gray: {

            '0': '#ffffff',
            '50': '#f1f2f2',
            '200': '#d6d6d6',
            '300': '#8c8c8c',
            '400': '#636363',
            '500': '#3d3d3d',
            '600': '#141414',
          },
          orange: {
            '100': '#fdf2e7',
            '200': '#fbdfc6',
            '300': '#f6b174',
            '400': '#f1882d',
            '500': '#c4630d',
            '600': '#a3520b',

          },
          ocean: {
            '100': '#d2eeee',
            '200': '#ade0e1',
            '300': '#6ec8c9',
            '400': '#42b1b3',
            '500': '#2c7677',
            '600': '#215859',
          },
          blue: {
            '100': '#d5e0eb',
            '200': '#a8bed6',
            '300': '#7b9dc1',
            '400': '#4b74a0',
            '500': '#314c68',
            '600': '#24374c'
          }
        }
      },
      fontSize: {
        'body-1': '12px',
        'body-2': '14px',
        'body-3': '16px',
        'body-4': '18px',
        'body-5': '20px',
        'body-6': '22px',
      
        'titles-1': '24px',
        'titles-2': '28px',
        'titles-3': '32px',
        'titles-4': '36px',
        'titles-5': '40px',
        'titles-6': '44px',
        'titles-7': '48px',
        'titles-8': '52px',
      
        'marketing-1': '56px',
        'marketing-2': '64px',
        'marketing-3': '72px',
        'marketing-4': '80px',
        'marketing-5': '88px',
        'marketing-6': '96px'
        
      },
      fontFamily: {   
        'sora': 'Sora, sans-serif;',
        'merriweather': 'Merriweather Sans, sans-serif;'
      }
    },
  },
  plugins: [],
}
