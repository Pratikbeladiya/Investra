import React, { useState } from "react";

import BuyActionWindow from "../components/common/Modal/BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, mode) => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [selectedMode, setSelectedMode] = useState("BUY");

  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [transactionSymbol, setTransactionSymbol] = useState("");
  const [transactionMode, setTransactionMode] = useState("BUY");

  const handleOpenBuyWindow = (uid, mode = "BUY") => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setSelectedMode(mode);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setSelectedMode("BUY");
  };

  const handleOpenTransaction = (symbol, mode = "BUY") => {
    setTransactionSymbol(symbol);
    setTransactionMode(mode);
    setIsTransactionOpen(true);
  };

  const handleCloseTransaction = () => {
    setIsTransactionOpen(false);
    setTransactionSymbol("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openTransaction: handleOpenTransaction,
        closeTransaction: handleCloseTransaction,
        transactionState: { isOpen: isTransactionOpen, symbol: transactionSymbol, mode: transactionMode }
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} mode={selectedMode} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;