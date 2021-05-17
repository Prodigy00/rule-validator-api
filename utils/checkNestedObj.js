module.exports = function nestedObjCheck(str) {
  return {
    level: str.split('.').length,
    isBeyondTwoLevels: str.split('.').length > 3,
  };
};
