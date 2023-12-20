import { createContext, useState } from 'react';

const GlobalContext = createContext({
  setFutureValueArr: () => {},
  futureValueArr: [],
});

const GlobalProvider = ({ children }) => {
  // Your state and methods go here
  const [futureValueArr, setFutureValueArr] = useState([]);

  // Provide the state and methods to the context
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
