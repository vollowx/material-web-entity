const fs = require('fs');
const sass = require('sass');

/**
 * @param {string} _
 * @returns {string}
 */
function clearing(_) {
  return _.split(': ').join(':').split(', ').join(',');
}

const result = clearing(
  sass
    .compile(`./src/index.scss`, {
      style: 'compressed',
    })
    .css.toString()
);

fs.writeFile(`./dist/mwe-bundle.min.css`, result, (err) => {
  if (err) {
    console.error(err);
    return;
  }
});
