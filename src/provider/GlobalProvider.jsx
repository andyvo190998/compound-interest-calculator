import { createContext, useState } from 'react';

const GlobalContext = createContext({
  setFutureValueArr: () => {},
  futureValueArr: [],
});

const GlobalProvider = ({ children }) => {
  const [futureValueArr, setFutureValueArr] = useState([]);

  const contextValue = {
    setFutureValueArr: setFutureValueArr,
    futureValueArr: futureValueArr,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };
