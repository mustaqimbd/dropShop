const userInfoHandler = user => {
  const {
    _id,
    name,
    email,
    logo,
    isAdmin,
    mobile,
    address,
    district,
    webOrPageLink,
  } = user;
  const userInfo = {
    _id,
    name,
    email,
    logo,
    mobile,
    address,
    district,
    webOrPageLink,
    isAdmin,
  };
  return userInfo;
};

module.exports = userInfoHandler;
