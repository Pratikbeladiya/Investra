import React, { useState, useEffect } from "react";
import apiClient from "../../services/api";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import PaymentIcon from '@mui/icons-material/Payment';
import HistoryIcon from '@mui/icons-material/History';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Funds = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("ADD"); // "ADD" or "WITHDRAW"
  const [paymentStep, setPaymentStep] = useState("AMOUNT"); // "AMOUNT" or "CHOOSE_PAYMENT"
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [showTransactions, setShowTransactions] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await apiClient.get("/user/profile");
      setProfile(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching profile for funds:", err);
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await apiClient.get("/user/transactions");
      const formatted = res.data.map(tx => ({
        id: tx._id,
        type: tx.type,
        amount: tx.total,
        date: new Date(tx.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'SUCCESS'
      }));
      setRecentTransactions(formatted);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchTransactions();
  }, []);

  const handleAction = async () => {
    if (!amount || isNaN(amount) || amount <= 0) return alert("Please enter a valid amount");
    setProcessing(true);
    try {
      const endpoint = activeTab === "ADD" ? "/user/add-funds" : "/user/withdraw";
      await apiClient.post(endpoint, { amount: Number(amount) });
      await fetchProfile();
      await fetchTransactions();
      setAmount("");
      setProcessing(false);
      setPaymentStep("AMOUNT");
      alert(activeTab === "ADD" ? "Funds added successfully!" : "Withdrawal request submitted!");
    } catch (err) {
      console.error(`Error ${activeTab === "ADD" ? "adding" : "withdrawing"} funds:`, err);
      alert(err.response?.data?.message || `Error ${activeTab === "ADD" ? "adding" : "withdrawing"} funds`);
      setProcessing(false);
    }
  };

  if (loading) return <div style={{ padding: "100px", textAlign: "center", color: "var(--text-secondary)", background: "var(--bg-primary)", minHeight: "100vh" }}>Loading...</div>;

  const balance = profile?.balance || 0;

  const styles = {
    container: {
      padding: "18px 24px",
      background: "var(--bg-primary)",
      minHeight: "calc(100vh - 60px)",
      color: "var(--text-primary)",
      fontFamily: "'Inter', sans-serif",
      transition: "all 0.3s ease"
    },
    layout: {
      display: "flex",
      flexWrap: "wrap",
      gap: "16px",
      maxWidth: "980px",
      margin: "0 auto"
    },
    leftCol: {
      flex: "1 1 320px",
      display: "flex",
      flexDirection: "column",
      gap: "14px"
    },
    rightCol: {
      flex: "0 0 360px",
      width: "100%",
      maxWidth: "380px",
      background: "var(--bg-secondary)",
      borderRadius: "12px",
      border: "1px solid var(--border-color)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      maxHeight: "520px"
    },
    card: {
      background: "var(--card-bg)",
      borderRadius: "12px",
      border: "1px solid var(--border-color)",
      padding: "18px",
    },
    balanceHeader: {
      textAlign: "center",
      paddingBottom: "14px",
      borderBottom: "1px dashed var(--border-color)",
      marginBottom: "14px"
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0"
    },
    infoText: {
      fontSize: "0.82rem",
      color: "var(--text-secondary)",
      lineHeight: "1.5"
    },
    tab: {
      flex: 1,
      padding: "12px",
      textAlign: "center",
      fontSize: "0.88rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
      borderBottom: "2px solid transparent",
      color: "var(--text-secondary)"
    },
    activeTab: {
      color: "var(--accent-color)",
      borderBottom: "2px solid var(--accent-color)"
    },
    amountInput: {
      width: "100%",
      background: "transparent",
      border: "none",
      color: "var(--text-primary)",
      fontSize: "1.6rem",
      fontWeight: "700",
      textAlign: amount.length > 0 ? "left" : "center",
      outline: "none",
      margin: "12px 0",
      paddingLeft: amount.length > 0 ? "28px" : "0",
      transition: "all 0.2s ease"
    },
    quickAddBtn: {
      background: "rgba(128,128,128,0.1)",
      border: "1px solid var(--border-color)",
      color: "var(--text-primary)",
      padding: "6px 12px",
      borderRadius: "16px",
      fontSize: "0.78rem",
      cursor: "pointer",
      transition: "all 0.2s"
    },
    mainBtn: {
      background: "var(--accent-color)",
      color: "#000",
      border: "none",
      padding: "14px",
      borderRadius: "10px",
      fontSize: "0.95rem",
      fontWeight: "700",
      cursor: "pointer",
      width: "100%",
      marginTop: "auto"
    },
    paymentOption: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px",
      borderRadius: "10px",
      border: "1px solid var(--border-color)",
      marginBottom: "10px",
      cursor: "pointer",
      transition: "all 0.2s"
    }
  };

  return (
    <div style={styles.container}>
      <div className="funds-layout" style={styles.layout}>
        {/* Left Column */}
        <div className="funds-left" style={styles.leftCol}>
          <div style={styles.card}>
            <div style={styles.balanceHeader}>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.78rem", marginBottom: "4px", fontWeight: "600" }}>Available Margin</p>
              <h1 style={{ fontSize: "1.6rem", margin: 0, fontWeight: "900", color: "var(--text-primary)" }}>₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.7rem", marginTop: "4px" }}>Total funds available for trading</p>
            </div>

            <div style={{ ...styles.row, padding: "14px 0", borderTop: "1px solid var(--border-color)" }}>
              <span style={{ fontWeight: "600", fontSize: "0.9rem", color: "var(--text-primary)" }}>Cash Balance</span>
              <span style={{ fontWeight: "700", fontSize: "1rem", color: "var(--accent-color)" }}>₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
            </div>

            <div style={styles.row}>
              <span style={{ fontWeight: "600", fontSize: "0.9rem", color: "var(--text-primary)" }}>Used Margin</span>
              <span style={{ fontWeight: "600", fontSize: "1rem", color: "#ff5252" }}>₹0.00</span>
            </div>

            <div style={styles.row}>
              <span style={{ fontWeight: "600", fontSize: "0.9rem", color: "var(--text-primary)" }}>Available for Withdrawal</span>
              <span style={{ fontWeight: "600", fontSize: "1rem", color: "var(--text-primary)" }}>₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div style={{ ...styles.card, padding: "12px 20px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
              onClick={() => setShowTransactions(!showTransactions)}
            >
              <span style={{ fontWeight: "700", fontSize: "0.9rem" }}>Recent Transactions</span>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--accent-color)" }}>{showTransactions ? "Hide" : "View All"}</span>
                <HistoryIcon style={{ color: "var(--text-secondary)", fontSize: "1.2rem" }} />
              </div>
            </div>

            {showTransactions && (
              <div style={{ maxHeight: "250px", overflowY: "auto", marginTop: "15px", animation: "fadeIn 0.3s ease" }}>
                {recentTransactions.length === 0 ? (
                  <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "0.8rem", padding: "20px" }}>No transactions found.</p>
                ) : (
                  recentTransactions.map(tx => (
                    <div key={tx.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", padding: "12px 0", borderBottom: "1px solid var(--border-color)" }}>
                      <div>
                        <p style={{ margin: 0, fontWeight: "600" }}>{tx.type}</p>
                        <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.7rem" }}>{tx.date}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ margin: 0, fontWeight: "700", color: tx.type === 'DEPOSIT' ? 'var(--accent-color)' : '#ff5252' }}>
                          {tx.type === 'DEPOSIT' ? '+' : '-'}₹{tx.amount}
                        </p>
                        <p style={{ margin: 0, fontSize: "0.65rem", color: "var(--text-secondary)" }}>{tx.status}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div style={styles.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
              <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>Instant trade balance</span>
              <button style={{ background: "rgba(0,208,156,0.1)", color: "var(--accent-color)", border: "none", padding: "6px 12px", borderRadius: "6px", fontWeight: "700", cursor: "pointer", fontSize: "0.75rem" }}>Pledge</button>
            </div>
            <p style={styles.infoText}>Get ₹0 for Intraday, MTF & FnO by pledging your assets</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="funds-right" style={styles.rightCol}>
          {paymentStep === "AMOUNT" ? (
            <>
              <div style={{ display: "flex", borderBottom: "1px solid var(--border-color)" }}>
                <div
                  style={{ ...styles.tab, ...(activeTab === "ADD" ? styles.activeTab : {}) }}
                  onClick={() => setActiveTab("ADD")}
                >
                  Add money
                </div>
                <div
                  style={{ ...styles.tab, ...(activeTab === "WITHDRAW" ? styles.activeTab : {}) }}
                  onClick={() => setActiveTab("WITHDRAW")}
                >
                  Withdraw
                </div>
              </div>

              <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ position: "relative", width: "100%", maxWidth: "300px" }}>
                  <span style={{
                    position: "absolute",
                    left: amount.length > 0 ? "0" : "calc(50% - 50px)",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "var(--text-primary)",
                    transition: "all 0.2s ease",
                    opacity: 0.8
                  }}>₹</span>
                  <input
                    style={styles.amountInput}
                    value={amount}
                    placeholder={amount.length > 0 ? "" : "0"}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                  />
                </div>

                <div style={{ display: "flex", gap: "8px", marginBottom: "30px", flexWrap: "wrap", justifyContent: "center" }}>
                  {["1000", "5000", "10000"].map(val => (
                    <button
                      key={val}
                      style={styles.quickAddBtn}
                      onClick={() => setAmount(val)}
                    >
                      +₹{val}
                    </button>
                  ))}
                </div>

                <button
                  style={styles.mainBtn}
                  onClick={() => activeTab === "ADD" ? setPaymentStep("CHOOSE_PAYMENT") : handleAction()}
                >
                  {activeTab === "ADD" ? "Continue" : (processing ? "Processing..." : "Withdraw money")}
                </button>

                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-secondary)", margin: "0 0 4px" }}>Note on Withdrawals: Requests before 5:00 PM processed same day.</p>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-secondary)", margin: 0 }}>Instant Payin: Use UPI for instant funds transfer.</p>
                </div>
              </div>
            </>
          ) : (
            <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <ArrowBackIcon
                  style={{ cursor: "pointer", fontSize: "1.2rem" }}
                  onClick={() => setPaymentStep("AMOUNT")}
                />
                <h2 style={{ fontSize: "1.1rem", margin: 0, fontWeight: "700" }}>Choose payment option</h2>
              </div>

              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "16px" }}>Paying ₹{amount}</p>

              <div
                style={styles.paymentOption}
                onClick={handleAction}
              >
                <PaymentIcon style={{ color: "var(--accent-color)" }} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: "600", fontSize: "0.9rem" }}>Pay via UPI ID</p>
                  <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.75rem" }}>Enter your VPA address</p>
                </div>
                <ChevronRightIcon style={{ fontSize: "1.2rem", color: "var(--text-secondary)" }} />
              </div>

              <div
                style={styles.paymentOption}
                onClick={handleAction}
              >
                <SmartphoneIcon style={{ color: "#4285F4" }} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: "600", fontSize: "0.9rem" }}>Pay via Apps</p>
                  <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.75rem" }}>Google Pay, PhonePe, Paytm</p>
                </div>
                <ChevronRightIcon style={{ fontSize: "1.2rem", color: "var(--text-secondary)" }} />
              </div>

              <div
                style={styles.paymentOption}
                onClick={handleAction}
              >
                <AccountBalanceIcon style={{ color: "#FBBC05" }} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: "600", fontSize: "0.9rem" }}>Pay via Bank</p>
                  <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.75rem" }}>Net Banking / IMPS</p>
                </div>
                <ChevronRightIcon style={{ fontSize: "1.2rem", color: "var(--text-secondary)" }} />
              </div>

              {processing && <p style={{ textAlign: "center", color: "var(--accent-color)", marginTop: "10px" }}>Processing payment...</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Funds;