// custom unique id generator.
const uniqueID = prefix => {
  const uuid = `${prefix}-${Date.now()}`;
  return uuid;
};
module.exports = uniqueID;
