import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import apiClient from "../../services/api";

const Home = () => {
  // Extract token immediately to avoid race conditions with child components' useEffects
  const params = new URLSearchParams(window.location.search);
  const tokenFromUrl = params.get("token");
  const userStrFromUrl = params.get("user");

  const STORAGE_TOKEN = 'trade_token';
  const STORAGE_USER = 'trade_user';
  const LEGACY_STORAGE_TOKEN = 'zerodha_token';
  const LEGACY_STORAGE_USER = 'zerodha_user';

  const saveAuthToken = (token) => {
    localStorage.setItem(STORAGE_TOKEN, token);
    localStorage.setItem(LEGACY_STORAGE_TOKEN, token);
    apiClient.setToken(token);
  };

  const saveAuthUser = (userString) => {
    if (userString) {
      localStorage.setItem(STORAGE_USER, userString);
      localStorage.setItem(LEGACY_STORAGE_USER, userString);
    }
  };

  if (tokenFromUrl && tokenFromUrl !== 'null') {
    saveAuthToken(tokenFromUrl);
    saveAuthUser(userStrFromUrl);
  } else {
    const savedToken = localStorage.getItem(STORAGE_TOKEN) || localStorage.getItem(LEGACY_STORAGE_TOKEN);
    if (savedToken && savedToken !== 'null') {
      apiClient.setToken(savedToken);
    }
  }

  useEffect(() => {
    // Clear the URL params after processing
    if (tokenFromUrl) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [tokenFromUrl]);

  return (
    <>
      <Dashboard />
    </>
  );
};

export default Home;
