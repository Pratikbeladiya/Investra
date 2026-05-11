import React, { useState, useEffect } from "react";
import apiClient from "../../services/api";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPositions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get("/trade/holdings");
      setAllPositions(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching positions:", err);
      setError("Failed to fetch positions.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
    
    const handleOrderPlaced = () => {
      fetchPositions();
    };
    window.addEventListener("orderPlaced", handleOrderPlaced);
    
    return () => {
      window.removeEventListener("orderPlaced", handleOrderPlaced);
    };
  }, []);


  return (
    <div style={{ padding: "0 20px" }}>
      <h3 style={{ fontSize: "1.5rem", fontWeight: "400", color: "var(--text-primary)", marginBottom: "30px" }}>
        Positions ({allPositions.length})
      </h3>
 
      {error && (
        <div style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", padding: "16px", borderRadius: "8px", marginBottom: "20px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
          {error}
        </div>
      )}
 
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>Loading positions...</div>
      ) : allPositions.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px", background: "var(--card-bg)", borderRadius: "12px", border: "1px dashed var(--border-color)" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>You have no open positions.</p>
        </div>
      ) : (
        <div className="table-compact" style={{ background: "var(--card-bg)", borderRadius: "12px", overflowX: "auto", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", border: "1px solid var(--border-color)" }}>
          <table style={{ width: "100%", minWidth: "640px", borderCollapse: "collapse" }}>
            <thead style={{ background: "var(--bg-secondary)" }}>
              <tr>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.8rem", textTransform: "uppercase" }}>Assets</th>
                <th style={{ textAlign: "right", padding: "10px 12px", color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.8rem", textTransform: "uppercase" }}>Qty.</th>
                <th style={{ textAlign: "right", padding: "10px 12px", color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.8rem", textTransform: "uppercase" }}>Avg.</th>
                <th style={{ textAlign: "right", padding: "10px 12px", color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.8rem", textTransform: "uppercase" }}>LTP</th>
                <th style={{ textAlign: "right", padding: "10px 12px", color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.8rem", textTransform: "uppercase" }}>P&L</th>
                <th style={{ textAlign: "right", padding: "10px 12px", color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.8rem", textTransform: "uppercase" }}>Chg.</th>
              </tr>
            </thead>
            <tbody>
              {allPositions.map((stock, index) => {
                const pl = (stock.latestPrice - stock.avgPrice) * stock.qty;
                const isProfit = pl >= 0;
                const plColor = isProfit ? "var(--accent-color)" : "#ef4444";
                const chg = ((stock.latestPrice - stock.avgPrice) / stock.avgPrice * 100).toFixed(2);
 
                return (
                  <tr key={index} style={{ borderTop: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "10px 12px", fontWeight: "600", color: "var(--text-primary)", fontSize: "0.92rem" }}>{stock.stockSymbol}</td>
                    <td style={{ padding: "10px 12px", textAlign: "right", color: "var(--text-primary)", fontSize: "0.92rem" }}>{stock.qty}</td>
                    <td style={{ padding: "10px 12px", textAlign: "right", color: "var(--text-primary)", fontSize: "0.92rem" }}>{stock.avgPrice.toFixed(2)}</td>
                    <td style={{ padding: "10px 12px", textAlign: "right", color: "var(--text-primary)", fontSize: "0.92rem" }}>{stock.latestPrice.toFixed(2)}</td>
                    <td style={{ padding: "10px 12px", textAlign: "right", color: plColor, fontWeight: "600", fontSize: "0.92rem" }}>
                      {isProfit ? "+" : ""}{pl.toFixed(2)}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", color: plColor, fontSize: "0.92rem" }}>
                      {isProfit ? "+" : ""}{chg}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Positions;
