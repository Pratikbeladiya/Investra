export const getToken = () => localStorage.getItem("investra_token") || localStorage.getItem("trade_token") || localStorage.getItem("zerodha_token");
export const getUser = () => JSON.parse(localStorage.getItem("investra_user") || localStorage.getItem("trade_user") || localStorage.getItem("zerodha_user") || "null");

export const saveAuth = ({ token, user }) => {
  const tokenKeys = ["investra_token", "trade_token", "zerodha_token"];
  const userKeys = ["investra_user", "trade_user", "zerodha_user"];
  
  tokenKeys.forEach(key => localStorage.setItem(key, token));
  userKeys.forEach(key => localStorage.setItem(key, JSON.stringify(user)));
};

export const clearAuth = () => {
  ["investra_token", "trade_token", "zerodha_token", "investra_user", "trade_user", "zerodha_user"].forEach(key => localStorage.removeItem(key));
};
