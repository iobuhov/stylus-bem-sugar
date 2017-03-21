module.exports = function (options) {
  var defaults = {
    elementPrefix: '__',
    modifierPrefix: '--',
    modifierDelimiter: '-'
  }

  options = options || defaults;

  return function (style) {
    style.define('e-prefix', options.elementPrefix);
    style.define('m-prefix', options.modifierPrefix);
    style.define('m-delimiter', options.modifierDelimiter);
    style.include(__dirname);
  }
}
