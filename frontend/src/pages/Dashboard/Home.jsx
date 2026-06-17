import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import apiClient from "../../services/api";
import { saveAuth, getToken } from '../../services/authStorage';

const Home = () => {
  // Extract token immediately to avoid race conditions with child components' useEffects
  const params = new URLSearchParams(window.location.search);
  const tokenFromUrl = params.get("token");
  const userStrFromUrl = params.get("user");

  if (tokenFromUrl && tokenFromUrl !== 'null') {
    let parsedUser = null;
    if (userStrFromUrl) {
      try {
        parsedUser = JSON.parse(decodeURIComponent(userStrFromUrl));
      } catch (e) {
        parsedUser = null;
      }
    }
    saveAuth({ token: tokenFromUrl, user: parsedUser });
    apiClient.setToken(tokenFromUrl);
  } else {
    const savedToken = getToken();
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

