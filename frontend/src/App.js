import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/common/Footer';

// Landing Pages
import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';
import PricingPage from './pages/Pricing/PricingPage';
import SupportPage from './pages/Support/SupportPage';
import ProductPage from './pages/Products/ProductPage';
import LoginPage from './pages/Login/Login';
import SignupPage from './pages/Signup/Signup';
import NotFound from './pages/NotFound/NotFound';

// Dashboard Components (Merged)
import DashboardHome from './pages/Dashboard/Home';

const App = () => {
  return (
    <Routes>
      {/* Landing Page Routes */}
      <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
      <Route path="/about" element={<><Navbar /><AboutPage /><Footer /></>} />
      <Route path="/pricing" element={<><Navbar /><PricingPage /><Footer /></>} />
      <Route path="/support" element={<><Navbar /><SupportPage /><Footer /></>} />
      <Route path="/products" element={<><Navbar /><ProductPage /><Footer /></>} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Dashboard Routes (Unified Project) */}
      <Route path="/dashboard/*" element={<DashboardHome />} />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
