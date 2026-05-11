import React from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "../Apps/Apps";
import Funds from "../Funds/Funds";
import Holdings from "../Holdings/Holdings";
import Orders from "../Orders/Orders";
import Positions from "../Positions/Positions";
import Summary from "../../components/dashboard/Summary";
import Watchlist from "../../components/watchlist/Watchlist";
import Account from "../Profile/Profile";
import IPOExplore from "../Apps/IPOExplore";
import MutualFundsExplore from "../Apps/MutualFundsExplore";
import ETFExplore from "../Apps/ETFExplore";
import BondExplore from "../Apps/BondExplore";
import { GeneralContextProvider } from "../../context/GeneralContext";
import TransactionWindow from "../../components/common/Modal/TransactionModal";
import DashboardLayout from "./DashboardLayout";

const DashboardContent = () => {
  const [txState, setTxState] = React.useState({ isOpen: false, symbol: "", mode: "BUY" });

  const openTransaction = React.useCallback((symbol, mode) => {
    setTxState({ isOpen: true, symbol, mode });
  }, []);

  const closeTransaction = () => setTxState((prevState) => ({ ...prevState, isOpen: false }));

  React.useEffect(() => {
    window.openTransaction = openTransaction;
    return () => {
      if (window.openTransaction === openTransaction) {
        delete window.openTransaction;
      }
    };
  }, [openTransaction]);

  return (
    <DashboardLayout>
      <div className="dashboard-page-container" style={{ position: "relative" }}>
        <Watchlist onOpenTransaction={openTransaction} />

        <div className="dashboard-content-area">
          <Routes>
            <Route exact path="/" element={<Summary />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/profile" element={<Account />} />
            <Route path="/statements" element={<Account />} />
            <Route path="/settings" element={<Account />} />
            <Route path="/ipo" element={<IPOExplore />} />
            <Route path="/mutual-funds" element={<MutualFundsExplore />} />
            <Route path="/etfs" element={<ETFExplore />} />
            <Route path="/bonds" element={<BondExplore />} />
          </Routes>
        </div>

        {/* Transaction Overlay - Triggered via Global State for absolute reliability */}
        {txState.isOpen && (
          <div className="transaction-overlay" onClick={closeTransaction}>
            <div className="transaction-overlay-content" onClick={(e) => e.stopPropagation()}>
              <TransactionWindow
                symbol={txState.symbol}
                mode={txState.mode}
                onClose={closeTransaction}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const Dashboard = () => {
  return (
    <GeneralContextProvider>
      <DashboardContent />
    </GeneralContextProvider>
  );
};

export default Dashboard;
