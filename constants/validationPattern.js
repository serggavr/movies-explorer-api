const linkValidationPattern = /^https*:\/\/(www.)*[0-9a-zа-я.\-_~:/?[\]@!$&'()*+,;=]{1,}(#*$)/i;
const idValidationPattern = /^[0-9a-f]{24}$/i;

module.exports = {
  linkValidationPattern,
  idValidationPattern,
};
