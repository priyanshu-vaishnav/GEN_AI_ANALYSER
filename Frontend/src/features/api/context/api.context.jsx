import { createContext, useState } from "react";

import { useEffect } from "react";


export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {

  const [apiReport, setApiReport] = useState(null);

  
 
  return (
    <ApiContext.Provider
      value={{
        apiReport,
        setApiReport
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
