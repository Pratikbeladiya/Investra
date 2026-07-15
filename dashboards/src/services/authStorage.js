const TOKEN_KEYS = ["investra_token", "trade_token", "zerodha_token"];
const USER_KEYS = ["investra_user", "trade_user", "zerodha_user"];

const getFirst = (keys, transform = v => v) => {
  for (const key of keys) {
    const val = localStorage.getItem(key);
    if (val !== null && val !== undefined) {
      try {
        return transform(val);
      } catch {
        // skip invalid parse
      }
    }
  }
  return null;
};

export const getToken = () => getFirst(TOKEN_KEYS);
export const getUser = () => getFirst(USER_KEYS, v => JSON.parse(v));

export const saveAuth = ({ token, user }) => {
  if (typeof token === 'string') {
    TOKEN_KEYS.forEach(k => localStorage.setItem(k, token));
  }
  const userStr = JSON.stringify(user);
  USER_KEYS.forEach(k => localStorage.setItem(k, userStr));
};

export const clearAuth = () => {
  [...TOKEN_KEYS, ...USER_KEYS].forEach(k => localStorage.removeItem(k));
};

const authStorageService = {
  getToken,
  getUser,
  saveAuth,
  clearAuth,
};

export default authStorageService;
