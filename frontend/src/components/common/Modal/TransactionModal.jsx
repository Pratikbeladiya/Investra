import React, { useState, useEffect } from "react";
import apiClient from "../../../services/api";

const TransactionWindow = ({ symbol, mode, onClose }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockInfo, setStockInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [currentHolding, setCurrentHolding] = useState(null);
  const [orderType, setOrderType] = useState("MARKET");
  const [limitPrice, setLimitPrice] = useState("");
  const [toast, setToast] = useState({ message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    window.clearTimeout(window.transactionToastTimeout);
    window.transactionToastTimeout = window.setTimeout(() => {
      setToast({ message: "", type: "" });
    }, 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stocksRes, profileRes, holdingsRes] = await Promise.all([
          apiClient.get("/stocks"),
          apiClient.get("/user/profile"),
          apiClient.get("/trade/holdings")
        ]);

        const stock = stocksRes.data.find(s => s.symbol === symbol);
        if (!stock) {
          setLoading(false);
          return;
        }

        const holding = holdingsRes.data.find(h => h.stockSymbol === symbol);

        setStockInfo(stock);
        setProfile(profileRes.data);
        setCurrentHolding(holding || null);
        setLimitPrice(stock.price.toString());
        setLoading(false);
      } catch (err) {
        console.error("Error fetching transaction data:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [symbol]);

  const handleQuantityChange = (delta) => {
    const newQty = Math.max(1, stockQuantity + delta);
    if (mode === "SELL" && currentHolding && newQty > currentHolding.qty) {
      return; // Don't allow selling more than owned
    }
    setStockQuantity(newQty);
  };

  const handleActionClick = async () => {
    if (!stockInfo) return;

    if (orderType === "LIMIT") {
      const limitValue = parseFloat(limitPrice);
      if (!limitPrice || Number.isNaN(limitValue) || limitValue <= 0) {
        showToast("Enter a valid limit price.", "error");
        return;
      }
    }

    setProcessing(true);
    try {
      const orderData = {
        symbol: symbol,
        qty: parseInt(stockQuantity, 10),
        side: mode,
        type: orderType,
      };

      if (orderType === "LIMIT") {
        orderData.price = parseFloat(limitPrice);
      }

      await apiClient.post("/trade/order", orderData);

      setProcessing(false);
      showToast(`${mode} order placed successfully!`, "success");
      onClose();
      // Notify other components that an order was placed
      window.dispatchEvent(new Event("orderPlaced"));
    } catch (err) {
      console.error("Error placing order:", err);
      showToast(err.response?.data?.message || "Error placing order", "error");
      setProcessing(false);
    }
  };

  const isBuy = mode === "BUY";
  const themeColor = isBuy ? "#00d09c" : "#ff5252";
  const currentPrice = stockInfo?.price || 0;
  const totalCost = stockQuantity * currentPrice;
  const canAfford = profile?.balance >= totalCost;

  if (loading) {
    return (
      <div style={{
        width: "450px",
        height: "100%",
        background: "var(--card-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-secondary)"
      }}>
        Loading...
      </div>
    );
  }

  if (!stockInfo) {
    return (
      <div style={{
        width: "450px",
        height: "100%",
        background: "var(--card-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-secondary)"
      }}>
        Stock not found
      </div>
    );
  }

  return (
    <div style={{
      width: "450px",
      height: "100%",
      background: "var(--card-bg)",
      boxShadow: "-10px 0 30px rgba(0,0,0,0.2)",
      display: "flex",
      flexDirection: "column",
      borderLeft: "1px solid var(--border-color)",
      animation: "slideInRight 0.3s ease-out",
      color: "var(--text-primary)",
      position: "relative"
    }}>
      {toast.message && (
        <div style={{
          position: "absolute",
          top: "18px",
          right: "18px",
          background: toast.type === "success" ? "#d1fae5" : "#fee2e2",
          color: toast.type === "success" ? "#065f46" : "#991b1b",
          padding: "12px 16px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          zIndex: 10,
          minWidth: "240px",
          fontWeight: "600"
        }}>
          {toast.message}
        </div>
      )}
      {/* Header */}
      <div style={{
        padding: "20px 24px",
        borderBottom: "1px solid var(--border-color)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "var(--bg-secondary)"
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "700", color: "var(--text-primary)" }}>
            {stockInfo.symbol}
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            {stockInfo.companyName}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
            <span style={{ fontSize: "1.2rem", fontWeight: "600", color: "var(--text-primary)" }}>
              ₹{currentPrice.toFixed(2)}
            </span>
            <span style={{
              fontSize: "0.8rem",
              color: stockInfo.percent >= 0 ? "#00d09c" : "#ff5252",
              fontWeight: "500"
            }}>
              {stockInfo.percent >= 0 ? "+" : ""}{stockInfo.percent.toFixed(2)}%
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            cursor: "pointer",
            color: "var(--text-secondary)",
            fontSize: "1.4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s"
          }}
          onMouseEnter={(e) => e.target.style.background = "var(--hover-bg)"}
          onMouseLeave={(e) => e.target.style.background = "transparent"}
        >
          ×
        </button>
      </div>

      {/* Mode Tabs */}
      <div style={{ display: "flex", padding: "0 24px", marginTop: "16px" }}>
        <div style={{
          padding: "12px 24px",
          color: themeColor,
          fontWeight: "700",
          borderBottom: `3px solid ${themeColor}`,
          fontSize: "1rem",
          textTransform: "uppercase",
          background: "var(--bg-primary)"
        }}>
          {isBuy ? "BUY" : "SELL"}
        </div>
      </div>

      <div style={{ padding: "24px", flex: 1, overflowY: "auto" }}>
        {/* Current Holdings Info for SELL */}
        {mode === "SELL" && currentHolding && (
          <div style={{
            background: "rgba(255, 193, 7, 0.1)",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid rgba(255, 193, 7, 0.3)"
          }}>
            <h4 style={{ margin: "0 0 8px", fontSize: "0.9rem", color: "#856404" }}>Your Holdings</h4>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
              <span>Quantity: <strong>{currentHolding.qty}</strong></span>
              <span>Avg Price: <strong>₹{currentHolding.avgPrice.toFixed(2)}</strong></span>
            </div>
          </div>
        )}

        {/* Order Type */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{
            display: "block",
            fontSize: "0.8rem",
            fontWeight: "600",
            color: "var(--text-secondary)",
            marginBottom: "12px",
            textTransform: "uppercase"
          }}>
            Order Type
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setOrderType("MARKET")}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "6px",
                border: orderType === "MARKET" ? `2px solid ${themeColor}` : "1px solid var(--border-color)",
                background: orderType === "MARKET" ? `${themeColor}20` : "var(--bg-secondary)",
                color: orderType === "MARKET" ? themeColor : "var(--text-primary)",
                fontSize: "0.85rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              Market
            </button>
            <button
              onClick={() => setOrderType("LIMIT")}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "6px",
                border: orderType === "LIMIT" ? `2px solid ${themeColor}` : "1px solid var(--border-color)",
                background: orderType === "LIMIT" ? `${themeColor}20` : "var(--bg-secondary)",
                color: orderType === "LIMIT" ? themeColor : "var(--text-primary)",
                fontSize: "0.85rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              Limit
            </button>
          </div>
        </div>

        {/* Quantity and Price */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
          <div style={{ flex: 1 }}>
            <label style={{
              display: "block",
              fontSize: "0.8rem",
              fontWeight: "600",
              color: "var(--text-secondary)",
              marginBottom: "8px",
              textTransform: "uppercase"
            }}>
              Quantity
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={() => handleQuantityChange(-1)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "4px",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max={mode === "SELL" && currentHolding ? currentHolding.qty : undefined}
                value={stockQuantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1;
                  if (mode === "SELL" && currentHolding && val > currentHolding.qty) return;
                  setStockQuantity(Math.max(1, val));
                }}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "1rem",
                  fontWeight: "600",
                  textAlign: "center",
                  outline: "none"
                }}
              />
              <button
                onClick={() => handleQuantityChange(1)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "4px",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                +
              </button>
            </div>
          </div>

          {orderType === "LIMIT" && (
            <div style={{ flex: 1 }}>
              <label style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: "600",
                color: "var(--text-secondary)",
                marginBottom: "8px",
                textTransform: "uppercase"
              }}>
                Limit Price
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                placeholder="Enter price"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "1rem",
                  fontWeight: "600",
                  outline: "none"
                }}
              />
            </div>
          )}
        </div>

        {/* Product Type */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{
            display: "block",
            fontSize: "0.8rem",
            fontWeight: "600",
            color: "var(--text-secondary)",
            marginBottom: "12px",
            textTransform: "uppercase"
          }}>
            Product
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{
              padding: "8px 16px",
              borderRadius: "20px",
              background: "rgba(0,208,156,0.1)",
              color: "#00d09c",
              fontSize: "0.85rem",
              fontWeight: "600",
              border: "1px solid #00d09c",
              flex: 1,
              textAlign: "center"
            }}>
              Delivery
            </div>
            <div style={{
              padding: "8px 16px",
              borderRadius: "20px",
              background: "var(--bg-secondary)",
              color: "var(--text-secondary)",
              fontSize: "0.85rem",
              fontWeight: "600",
              border: "1px solid var(--border-color)",
              flex: 1,
              textAlign: "center"
            }}>
              Intraday
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div style={{
          background: "var(--bg-secondary)",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid var(--border-color)"
        }}>
          <h4 style={{ margin: "0 0 16px", fontSize: "1rem", color: "var(--text-primary)" }}>Order Summary</h4>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Quantity</span>
            <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--text-primary)" }}>{stockQuantity}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Price</span>
            <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--text-primary)" }}>
              ₹{orderType === "LIMIT" ? parseFloat(limitPrice || 0).toFixed(2) : currentPrice.toFixed(2)}
            </span>
          </div>

          <div style={{ height: "1px", background: "var(--border-color)", margin: "12px 0" }}></div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--text-primary)" }}>Total Amount</span>
            <span style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--text-primary)" }}>
              ₹{totalCost.toFixed(2)}
            </span>
          </div>

          {isBuy && (
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Available Balance</span>
              <span style={{ fontSize: "0.85rem", fontWeight: "600", color: canAfford ? "var(--text-primary)" : "#ff5252" }}>
                ₹{profile?.balance.toLocaleString("en-IN")}
              </span>
            </div>
          )}

          {mode === "SELL" && currentHolding && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Est. P&L</span>
              <span style={{
                fontSize: "0.85rem",
                fontWeight: "600",
                color: ((currentPrice - currentHolding.avgPrice) * stockQuantity) >= 0 ? "#00d09c" : "#ff5252"
              }}>
                {((currentPrice - currentHolding.avgPrice) * stockQuantity) >= 0 ? "+" : ""}
                ₹{((currentPrice - currentHolding.avgPrice) * stockQuantity).toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {/* Validation Messages */}
        {isBuy && !canAfford && (
          <div style={{
            background: "rgba(255, 82, 82, 0.1)",
            color: "#ff5252",
            padding: "12px",
            borderRadius: "8px",
            marginTop: "16px",
            border: "1px solid rgba(255, 82, 82, 0.3)",
            fontSize: "0.85rem",
            textAlign: "center"
          }}>
            Insufficient balance. Required: ₹{totalCost.toFixed(2)}
          </div>
        )}

        {mode === "SELL" && currentHolding && stockQuantity > currentHolding.qty && (
          <div style={{
            background: "rgba(255, 193, 7, 0.1)",
            color: "#856404",
            padding: "12px",
            borderRadius: "8px",
            marginTop: "16px",
            border: "1px solid rgba(255, 193, 7, 0.3)",
            fontSize: "0.85rem",
            textAlign: "center"
          }}>
            Cannot sell more than your holdings ({currentHolding.qty} shares)
          </div>
        )}
      </div>

      {/* Footer Button */}
      <div style={{ padding: "20px 24px", borderTop: "1px solid var(--border-color)", background: "var(--bg-secondary)" }}>
        <button
          onClick={handleActionClick}
          disabled={processing || (isBuy && !canAfford) || (mode === "SELL" && currentHolding && stockQuantity > currentHolding.qty)}
          style={{
            width: "100%",
            background: (isBuy && !canAfford) || (mode === "SELL" && currentHolding && stockQuantity > currentHolding.qty) ? "#ccc" : themeColor,
            color: "#fff",
            border: "none",
            padding: "16px",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: "700",
            cursor: (isBuy && !canAfford) || (mode === "SELL" && currentHolding && stockQuantity > currentHolding.qty) ? "not-allowed" : "pointer",
            transition: "opacity 0.2s, transform 0.1s"
          }}
          onMouseEnter={(e) => {
            if (!((isBuy && !canAfford) || (mode === "SELL" && currentHolding && stockQuantity > currentHolding.qty))) {
              e.target.style.opacity = "0.9";
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = "1";
          }}
          onMouseDown={(e) => {
            if (!((isBuy && !canAfford) || (mode === "SELL" && currentHolding && stockQuantity > currentHolding.qty))) {
              e.target.style.transform = "scale(0.98)";
            }
          }}
          onMouseUp={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          {processing ? "PROCESSING..." : `${isBuy ? "BUY" : "SELL"} ${stockQuantity} Shares`}
        </button>
      </div>
    </div>
  );
};

export default TransactionWindow;
