exports.fundsValidation = (data) => {
  if (!data.amount || Number(data.amount) <= 0) {
    return { error: 'Invalid amount' };
  }
  return { error: null };
};
