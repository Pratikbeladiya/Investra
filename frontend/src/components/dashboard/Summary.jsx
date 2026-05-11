import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/api";
import EquityCard from "./EquityCard";
import HoldingsCard from "../../components/holdings/HoldingsCard";
import '../../styles/dashboard/Summary.css';

const Summary = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showExploreModal, setShowExploreModal] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await apiClient.get("/user/profile");
      setProfile(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();

    const handleOrderPlaced = () => {
      fetchProfile();
    };
    window.addEventListener("orderPlaced", handleOrderPlaced);

    return () => {
      window.removeEventListener("orderPlaced", handleOrderPlaced);
    };
  }, []);

  if (loading) return <div className="summary-loading">Loading dashboard...</div>;

  return (
    <div className="summary-container">
      <div className="username">
        <h1 className="username-title">Hi, {profile ? profile.username : "Trader"}!</h1>
        <div className="username-divider"></div>
        <button
          className="explore-btn"
          onClick={() => setShowExploreModal(true)}
        >
          Explore Investments
        </button>
      </div>

      <div className="summary-cards">
        <EquityCard balance={profile?.balance} />
        <HoldingsCard profile={profile} />
      </div>

      {/* Explore Modal */}
      {showExploreModal && (
        <div className="modal-overlay" onClick={() => setShowExploreModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Explore Investments</h3>
            <div className="modal-buttons">
              <button
                className="modal-action-btn"
                onClick={() => { navigate('/dashboard/ipo'); setShowExploreModal(false); }}
              >
                Explore IPOs
              </button>
              <button
                className="modal-action-btn"
                onClick={() => { navigate('/dashboard/mutual-funds'); setShowExploreModal(false); }}
              >
                Explore Mutual Funds
              </button>
              <button
                className="modal-action-btn"
                onClick={() => { navigate('/dashboard/etfs'); setShowExploreModal(false); }}
              >
                Explore ETFs
              </button>
              <button
                className="modal-action-btn"
                onClick={() => { navigate('/dashboard/bonds'); setShowExploreModal(false); }}
              >
                Explore Bonds
              </button>
            </div>
            <button
              className="modal-close-btn"
              onClick={() => setShowExploreModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;

