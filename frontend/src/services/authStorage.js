import { getToken, getUser, saveAuth, clearAuth } from './authService';

export { getToken, getUser, saveAuth, clearAuth };

const authStorageService = {
  getToken,
  getUser,
  saveAuth,
  clearAuth,
};

export default authStorageService;

