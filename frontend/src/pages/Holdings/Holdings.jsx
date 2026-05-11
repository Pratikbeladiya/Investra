import React, { useState, useEffect } from "react";
import apiClient from "../../services/api";
import { VerticalGraph } from "../../components/common/VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHoldings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get("/trade/holdings");
      setAllHoldings(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching holdings:", err);
      setError("Failed to fetch holdings. Is the backend running?");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoldings();
    
    const handleOrderPlaced = () => {
      fetchHoldings();
    };
    window.addEventListener("orderPlaced", handleOrderPlaced);
    
    return () => {
      window.removeEventListener("orderPlaced", handleOrderPlaced);
    };
  }, []);

  const labels = allHoldings.map((stock) => stock.stockSymbol);

  const graphData = {
    labels,
    datasets: [
      {
        label: "Market Value",
        data: allHoldings.map((stock) => stock.latestPrice * stock.qty),
        backgroundColor: "rgba(79, 70, 229, 0.5)",
      },
    ],
  };

  const totalInvestment = allHoldings.reduce((acc, stock) => acc + stock.avgPrice * stock.qty, 0);
  const currentValue = allHoldings.reduce((acc, stock) => acc + stock.latestPrice * stock.qty, 0);
  const totalPL = currentValue - totalInvestment;

  return (
    <div style={{ padding: "0 20px" }}>
      <h3 style={{ fontSize: "1.5rem", fontWeight: "400", color: "var(--text-primary)", marginBottom: "30px" }}>
        Holdings ({allHoldings.length})
      </h3>
 
      {error && (
        <div style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", padding: "16px", borderRadius: "8px", marginBottom: "20px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
          {error}
        </div>
      )}
 
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>Loading holdings...</div>
      ) : allHoldings.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", background: "var(--card-bg)", borderRadius: "12px", border: "1px dashed var(--border-color)" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>No holdings found in your portfolio.</p>
        </div>
      ) : (
        <>
          <div className="table-compact order-table" style={{ background: "var(--card-bg)", borderRadius: "12px", overflowX: "auto", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", border: "1px solid var(--border-color)" }}>
            <table style={{ width: "100%", minWidth: "640px", borderCollapse: "collapse" }}>
              <thead style={{ background: "var(--bg-secondary)" }}>
                <tr>
                  <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.8rem", textTransform: "uppercase" }}>Assets</th>
                  <th style={{ textAlign: "right", padding: "10px 12px", color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.8rem", textTransform: "uppercase" }}>Qty.</th>
                  <th style={{ textAlign: "right", padding: "10px 12px", color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.8rem", textTransform: "uppercase" }}>Avg. Cost</th>
                  <th style={{ textAlign: "right", padding: "10px 12px", color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.8rem", textTransform: "uppercase" }}>LTP</th>
                  <th style={{ textAlign: "right", padding: "10px 12px", color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.8rem", textTransform: "uppercase" }}>Cur. Val</th>
                  <th style={{ textAlign: "right", padding: "10px 12px", color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.8rem", textTransform: "uppercase" }}>P&L</th>
                  <th style={{ textAlign: "right", padding: "10px 12px", color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.8rem", textTransform: "uppercase" }}>Net Chg.</th>
                </tr>
              </thead>
              <tbody>
                {allHoldings.map((stock, index) => {
                  const stockValue = stock.latestPrice * stock.qty;
                  const pl = stockValue - stock.avgPrice * stock.qty;
                  const isProfit = pl >= 0;
                  const plColor = isProfit ? "var(--accent-color)" : "#ef4444";
                  const netChg = ((stock.latestPrice - stock.avgPrice) / stock.avgPrice * 100).toFixed(2);
 
                  return (
                    <tr key={index} style={{ borderTop: "1px solid var(--border-color)" }}>
                      <td style={{ padding: "10px 12px", fontWeight: "500", color: "var(--text-primary)", fontSize: "0.92rem" }}>{stock.stockSymbol}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", color: "var(--text-primary)", fontSize: "0.92rem" }}>{stock.qty}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", color: "var(--text-primary)", fontSize: "0.92rem" }}>{stock.avgPrice.toFixed(2)}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", color: "var(--text-primary)", fontSize: "0.92rem" }}>{stock.latestPrice.toFixed(2)}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", color: "var(--text-primary)", fontWeight: "500", fontSize: "0.92rem" }}>{stockValue.toFixed(2)}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", color: plColor, fontWeight: "500", fontSize: "0.92rem" }}>
                        {isProfit ? "+" : ""}{pl.toFixed(2)}
                      </td>
                      <td style={{ padding: "12px", textAlign: "right", color: plColor, fontSize: "0.92rem" }}>
                        {isProfit ? "+" : ""}{netChg}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
 
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "26px", marginBottom: "34px" }}>
            <div style={{ flex: "1 1 220px", background: "var(--card-bg)", padding: "16px", borderRadius: "12px", border: "1px solid var(--border-color)", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", margin: "0 0 8px" }}>Total investment</p>
              <h4 style={{ fontSize: "1.3rem", fontWeight: "600", margin: 0, color: "var(--text-primary)" }}>₹{totalInvestment.toLocaleString("en-IN")}</h4>
            </div>
            <div style={{ flex: "1 1 220px", background: "var(--card-bg)", padding: "16px", borderRadius: "12px", border: "1px solid var(--border-color)", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", margin: "0 0 8px" }}>Current value</p>
              <h4 style={{ fontSize: "1.3rem", fontWeight: "600", margin: 0, color: "var(--text-primary)" }}>₹{currentValue.toLocaleString("en-IN")}</h4>
            </div>
            <div style={{ flex: "1 1 220px", background: "var(--card-bg)", padding: "16px", borderRadius: "12px", border: "1px solid var(--border-color)", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", margin: "0 0 8px" }}>Total P&L</p>
              <h4 style={{ fontSize: "1.3rem", fontWeight: "600", margin: 0, color: totalPL >= 0 ? "var(--accent-color)" : "#ef4444" }}>
                {totalPL >= 0 ? "+" : ""}{totalPL.toLocaleString("en-IN")} ({totalInvestment > 0 ? ((totalPL / totalInvestment) * 100).toFixed(2) : "0.00"}%)
              </h4>
            </div>
          </div>
          
          <div style={{ background: "var(--card-bg)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border-color)", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <h5 style={{ margin: "0 0 18px", color: "var(--text-secondary)", fontSize: "0.95rem" }}>Portfolio Allocation</h5>
            <VerticalGraph data={graphData} />
          </div>
        </>
      )}
    </div>
  );
};

export default Holdings;

