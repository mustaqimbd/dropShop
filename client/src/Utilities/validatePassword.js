const validatePassword = password => {
  const passPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%*?])(?=.*\d).{8,}$/;
  return passPattern.test(password);
};
export default validatePassword;
