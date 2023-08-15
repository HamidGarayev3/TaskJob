import React, { createContext, useState,useContext } from 'react';

interface StockContextType {
  selectedStockName: string;
  setSelectedStockName: React.Dispatch<React.SetStateAction<string>>;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const StockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedStockName, setSelectedStockName] = useState('');

  return (
    <StockContext.Provider value={{ selectedStockName, setSelectedStockName }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStockContext = (): StockContextType => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStockContext must be used within a StockProvider');
  }
  return context;
};

export default StockContext;
