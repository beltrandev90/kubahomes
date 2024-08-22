const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    purgecss({
      content: [
        '**/*.html', // Analiza todos los archivos HTML en el proyecto
        '**/*.js'    // Incluye archivos JavaScript si aplicas clases dinámicamente
      ],
      safelist: [], // Añade clases que no quieras que PurgeCSS elimine
    }),
  ],
};
