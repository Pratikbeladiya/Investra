exports.orderValidation = (data) => {
  const symbol = data.symbol;
  const qty = data.qty;
  const side = data.side;

  if (!symbol || !qty || !['BUY', 'SELL'].includes(String(side || '').toUpperCase())) {
    return { error: 'Symbol, quantity and order side are required.' };
  }
  if (Number(qty) <= 0) {
    return { error: 'Quantity must be greater than zero.' };
  }
  return { error: null };
};
