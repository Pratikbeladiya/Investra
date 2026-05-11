import React, { useState, useEffect, useContext } from "react";
import apiClient from "../../../services/api";
import GeneralContext from "../../../context/GeneralContext";

const BuyActionWindow = ({ uid, mode = "BUY" }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockInfo, setStockInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const res = await apiClient.get("/stocks");
        const stock = res.data.find(s => s.symbol === uid);
        setStockInfo(stock);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching stock details:", err);
        setLoading(false);
      }
    };
    fetchStockDetails();
  }, [uid]);

  const handleActionClick = async () => {
    setProcessing(true);
    try {
      await apiClient.post("/trade/order", {
        symbol: uid,
        qty: parseInt(stockQuantity),
        side: mode,
      });
      
      setProcessing(false);
      generalContext.closeBuyWindow();
      window.dispatchEvent(new Event("orderPlaced"));
    } catch (err) {
      console.error("Error placing order:", err);
      alert(err.response?.data?.message || "Error placing order");
      setProcessing(false);
    }
  };

  const isBuy = mode === "BUY";
  const themeColor = isBuy ? "#4f46e5" : "#e11d48";

  if (loading) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.4)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
    }}>
      <div style={{
        width: "440px",
        background: "#fff",
        borderRadius: "24px",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        overflow: "hidden",
        animation: "slideUp 0.3s ease-out"
      }}>
        {/* Header */}
        <div style={{ background: themeColor, padding: "24px 30px", color: "#fff", position: "relative" }}>
          <button 
            onClick={() => generalContext.closeBuyWindow()}
            style={{ 
              position: "absolute", 
              top: "20px", 
              right: "20px", 
              background: "rgba(255,255,255,0.2)", 
              border: "none", 
              color: "#fff", 
              width: "28px", 
              height: "28px", 
              borderRadius: "50%", 
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              fontWeight: "300"
            }}
          >
            ×
          </button>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{ 
                background: "rgba(255,255,255,0.2)", 
                padding: "4px 12px", 
                borderRadius: "20px", 
                fontSize: "0.7rem", 
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}>
                Regular Order
              </span>
              <h2 style={{ margin: "10px 0 2px", fontSize: "1.6rem", fontWeight: "800" }}>{stockInfo?.symbol}</h2>
              <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.9 }}>{stockInfo?.companyName}</p>
            </div>
            <div style={{ textAlign: "right", marginRight: "35px" }}>
              <h2 style={{ margin: "10px 0 2px", fontSize: "1.6rem", fontWeight: "800" }}>₹{stockInfo?.price.toFixed(2)}</h2>
              <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.9 }}>
                {stockInfo?.percent > 0 ? "+" : ""}{stockInfo?.percent}%
              </p>
            </div>
          </div>
        </div>


        <div style={{ padding: "40px" }}>
          {/* Inputs */}
          <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "#6b7280", marginBottom: "10px" }}>QUANTITY</label>
              <input
                type="number"
                min="1"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                style={{ 
                  width: "100%", 
                  padding: "16px", 
                  borderRadius: "12px", 
                  border: "2px solid #f3f4f6", 
                  fontSize: "1.2rem", 
                  fontWeight: "700", 
                  outline: "none", 
                  transition: "border-color 0.2s",
                  boxSizing: "border-box"
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "#6b7280", marginBottom: "10px" }}>PRICE</label>
              <div style={{ 
                width: "100%", 
                padding: "16px", 
                borderRadius: "12px", 
                background: "#f9fafb", 
                border: "2px solid #f3f4f6", 
                fontSize: "1.2rem", 
                fontWeight: "700", 
                color: "#9ca3af",
                boxSizing: "border-box"
              }}>
                MARKET
              </div>
            </div>
          </div>

          {/* Margin Info */}
          <div style={{ 
            background: "#f8fafd", 
            padding: "20px", 
            borderRadius: "16px", 
            marginBottom: "35px",
            border: "1px solid #eef2ff"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "0.95rem", color: "#6b7280" }}>Margin Required</span>
              <span style={{ fontSize: "1.1rem", fontWeight: "800", color: themeColor }}>
                ₹{(stockQuantity * (stockInfo?.price || 0)).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.9rem", color: "#9ca3af" }}>Available Margin</span>
              <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "#4b5563" }}>₹12,450.00</span>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "15px" }}>
            <button
              onClick={handleActionClick}
              disabled={processing}
              style={{
                flex: 2,
                background: themeColor,
                color: "#fff",
                border: "none",
                padding: "18px",
                borderRadius: "16px",
                fontSize: "1.1rem",
                fontWeight: "800",
                cursor: "pointer",
                boxShadow: `0 10px 15px -3px ${themeColor}40`,
                transition: "all 0.2s",
                opacity: processing ? 0.7 : 1
              }}
            >
              {processing ? "Processing..." : (isBuy ? "PLACE BUY ORDER" : "PLACE SELL ORDER")}
            </button>
            <button
              onClick={() => generalContext.closeBuyWindow()}
              style={{
                flex: 1,
                background: "#f3f4f6",
                color: "#4b5563",
                border: "none",
                padding: "18px",
                borderRadius: "16px",
                fontSize: "1rem",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;