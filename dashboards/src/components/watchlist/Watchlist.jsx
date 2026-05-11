import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../../services/api";
import { DoughnutChart } from "../common/DoughnoutChart";
import WatchlistItem from "./WatchlistItem";
import '../../styles/watchlist/Watchlist.css';

const Watchlist = ({ onOpenTransaction }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);
  const location = useLocation();

  const fetchWatchlist = async () => {
    try {
      const res = await apiClient.get("/stocks");
      setWatchlist(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching watchlist:", err);
      setError("Failed to load stocks.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  // Reset search whenever the user navigates to a different route
  useEffect(() => {
    setSearchQuery("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [location.pathname]);

  // Force-clear any browser-autofilled value after each render
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current && inputRef.current.value !== searchQuery) {
        inputRef.current.value = searchQuery;
      }
    }, 300);
    return () => clearTimeout(timer);
  });

  const handleSearchChange = (e) => {
    const val = e.target.value;
    // Reject email-looking values (Chrome autofill artifact from password forms)
    if (val.includes("@") && val.includes(".")) {
      setSearchQuery("");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setSearchQuery(val);
  };

  const filteredList = watchlist.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const chartData = {
    labels: watchlist.slice(0, 10).map((s) => s.symbol),
    datasets: [
      {
        label: "Price",
        data: watchlist.slice(0, 10).map((s) => s.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          ref={inputRef}
          type="text"
          name="wl-srch"
          id="wl-srch"
          autoComplete="new-password"
          value={searchQuery}
          placeholder="Search stocks..."
          className="search"
          onChange={handleSearchChange}
        />
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-text">Loading stocks...</div>
      ) : (
        <div className="watchlist-content">
          <ul className="list">
            {filteredList.map((stock, index) => (
              <WatchlistItem stock={stock} key={index} onOpenTransaction={onOpenTransaction} />
            ))}
          </ul>
          <div className="market-sector-analysis">
            <h5 className="market-sector-title">Market Sector Analysis</h5>
            <div className="chart-container">
              <DoughnutChart data={chartData} />
            </div>
            <p className="chart-description">
              Sector-wise distribution of your watchlist.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
