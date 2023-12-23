import { ReactNode, createContext, useState } from 'react';

// Define the context type
interface futureValueProps {
  compound_frequency: { label: string };
  currency: { label: string };
  depositValue: number;
  futureValue: number;
  yearId: number;
}
interface ThemeContextType {
  futureValueArr: futureValueProps[];
  setFutureValueArr: () => void;
}

const GlobalContext = createContext({
  setFutureValueArr: () => {},
  futureValueArr: [],
});

// Create the provider component
interface ThemeProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [futureValueArr, setFutureValueArr] = useState([]);

  const contextValue: ThemeContextType = {
    // @ts-expect-error: Unreachable code error
    setFutureValueArr: setFutureValueArr,
    futureValueArr: futureValueArr,
  };

  return (
    // @ts-expect-error: Unreachable code error
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };
