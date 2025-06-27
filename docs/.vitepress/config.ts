import { defineConfig } from 'vitepress';

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  lang: 'en-US',
  title: 'SIH3 BBWS Citanduy',
  description: 'Sisfo H3 BBWS Citanduy.',

  themeConfig: {
    nav: [
      {
        text: 'Geospatial', link: '/geospatial'
      },
      {
         text: 'Hidrologi',
         items: [
           { text: 'Curah Hujan', link: '/hujan' },
           { text: 'Tinggi Muka Air', link: '/tma' },
           { text: 'Kualitas Air', link: '/kualitas-air' },
         ],
      },
      {
        text: 'Hidro Meteorologi',
        items: [
          { text: 'Prakiraan Cuaca', link: '/prakiraan' }
        ],
      },
      {
        text: 'Hidro Geologi',
        items: [
          { text: 'Muka Air Tanah', link: '/muka-air-tanah' },
          { text: 'Sumur Pantau', link: '/sumur-pantau' },
        ],
     },
     { text: 'Example', link: '/example' },


      // ...
    ],

    sidebar: [
      {
        // text: 'Guide',
        items: [
          { text: 'Example', link: '/example' },
          // ...
        ],
      },
    ],
  },
});
