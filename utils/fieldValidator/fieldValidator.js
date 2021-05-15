function ruleCheck(obj) {
  const ruleFieldExists = obj['rule'];
  if (!ruleFieldExists) {
    return 'rule is required';
  }
  return obj;
}

module.exports = {
  ruleCheck,
};
