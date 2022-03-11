const path = require('path');
module.exports = {
  plugins: [
    ['postcss-import', {}],
    require('postcss-nested')(),
    require('postcss-css-variables')({
      variables: require('./src/style/variables.json'),
    }),
    require('postcss-mixins')(),
    require('autoprefixer')(),
  ],
};
