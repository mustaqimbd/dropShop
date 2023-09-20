const userInfoHandler = user => {
  const {
    _id,
    name,
    email,
    logo,
    mobile,
    address,
    district,
    role,
    webOrPageLink,
    profile_pic,
  } = user;
  const userInfo = {
    _id,
    name,
    email,
    logo,
    mobile,
    address,
    district,
    role,
    webOrPageLink,
    profile_pic,
  };
  return userInfo;
};

module.exports = userInfoHandler;
