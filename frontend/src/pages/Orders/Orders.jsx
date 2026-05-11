import React, { useState, useEffect } from "react";
import apiClient from "../../services/api";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get("/trade/orders");
      setAllOrders(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Is the backend running?");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    
    const handleOrderPlaced = () => {
      fetchOrders();
    };
    window.addEventListener("orderPlaced", handleOrderPlaced);
    
    return () => {
      window.removeEventListener("orderPlaced", handleOrderPlaced);
    };
  }, []);

  return (
    <div style={{ padding: "0 20px" }}>
      <h3 style={{ fontSize: "1.5rem", fontWeight: "400", color: "var(--text-primary)", marginBottom: "30px" }}>
        Orders ({allOrders.length})
      </h3>
 
      {error && (
        <div style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", padding: "16px", borderRadius: "8px", marginBottom: "20px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
          {error}
        </div>
      )}
 
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>Loading orders...</div>
      ) : allOrders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px", background: "var(--card-bg)", borderRadius: "12px", border: "1px dashed var(--border-color)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "20px", opacity: 0.3 }}>📄</div>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginBottom: "20px" }}>You haven't placed any orders yet.</p>
          <button 
            style={{ 
              background: "var(--accent-color)", 
              color: "#000", 
              border: "none", 
              padding: "12px 24px", 
              borderRadius: "8px", 
              fontWeight: "600",
              cursor: "pointer"
            }}
            onClick={() => window.location.href = "/"}
          >
            Get Started
          </button>
        </div>
      ) : (
        <div className="table-compact" style={{ background: "var(--card-bg)", borderRadius: "12px", overflowX: "auto", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", border: "1px solid var(--border-color)" }}>
          <table style={{ width: "100%", minWidth: "640px", borderCollapse: "collapse" }}>
            <thead style={{ background: "var(--bg-secondary)" }}>
              <tr>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.8rem", textTransform: "uppercase" }}>Time</th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.8rem", textTransform: "uppercase" }}>Type</th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.8rem", textTransform: "uppercase" }}>Assets</th>
                <th style={{ textAlign: "right", padding: "10px 12px", color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.8rem", textTransform: "uppercase" }}>Qty.</th>
                <th style={{ textAlign: "right", padding: "10px 12px", color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.8rem", textTransform: "uppercase" }}>Price</th>
                <th style={{ textAlign: "right", padding: "10px 12px", color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.8rem", textTransform: "uppercase" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, index) => {
                const date = new Date(order.createdAt).toLocaleString();
                const isBuy = order.side === "BUY";
 
                return (
                  <tr key={index} style={{ borderTop: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "10px 12px", color: "var(--text-secondary)", fontSize: "0.88rem" }}>{date}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <span style={{ 
                        padding: "4px 8px", 
                        borderRadius: "4px", 
                        fontSize: "0.72rem", 
                        fontWeight: "700",
                        background: isBuy ? "rgba(79, 70, 229, 0.1)" : "rgba(225, 29, 72, 0.1)",
                        color: isBuy ? "var(--accent-color)" : "#e11d48"
                      }}>
                        {order.side}
                      </span>
                    </td>
                    <td style={{ padding: "10px 12px", fontWeight: "600", color: "var(--text-primary)", fontSize: "0.92rem" }}>{order.stockSymbol}</td>
                    <td style={{ padding: "10px 12px", textAlign: "right", color: "var(--text-primary)", fontSize: "0.92rem" }}>{order.qty}</td>
                    <td style={{ padding: "10px 12px", textAlign: "right", color: "var(--text-primary)", fontSize: "0.92rem" }}>{order.price.toFixed(2)}</td>
                    <td style={{ padding: "10px 12px", textAlign: "right" }}>
                      <span style={{ color: "var(--accent-color)", fontWeight: "500", fontSize: "0.9rem" }}>COMPLETE</span>
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

export default Orders;
