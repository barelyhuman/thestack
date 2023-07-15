// FORCE prettier to load plugins
module.exports = {
  ...require('@barelyhuman/prettier-config'),
  htmlWhitespaceSensitivity: 'css',
  plugins: ['prettier-plugin-twig-nunjucks-melody'],
}
