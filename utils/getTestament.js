const testamentMap = require("../config/testamentMap");

module.exports = function getTestament(bookTitle) {
  if (testamentMap.old.includes(bookTitle)) return "old";
  if (testamentMap.new.includes(bookTitle)) return "new";
  return null;
};
