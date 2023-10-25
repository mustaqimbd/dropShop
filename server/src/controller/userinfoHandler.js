const userInfoHandler = (user) => {
  const {
    _id,
    reseller_id,
    name,
    email,
    shop_info,
    balance,
    payments,
    phone,
    address,
    district,
    role,
    webOrPageLink,
    profile_pic,
    settings,
  } = user;

  const userInfo = {
    _id,
    reseller_id,
    name,
    email,
    shop_info,
    balance,
    payments,
    phone,
    address,
    district,
    role,
    webOrPageLink,
    profile_pic,
    settings,
  };

  return userInfo;
};

module.exports = userInfoHandler;
