exports.loginValidation = (data) => {
  if (!data.email || !data.password) {
    return { error: 'Email and password are required.' };
  }
  return { error: null };
};

exports.signupValidation = (data) => {
  if (!data.username || !data.email || !data.password) {
    return { error: 'Username, email and password are required.' };
  }
  return { error: null };
};
