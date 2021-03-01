import React, { useState,  createContext } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {

  
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");

  const [info, setInfo] = useState("")
     
 

  const stopAuth = () => {
    setAuth(false);
  };

  const grantAuth = () => {
     setAuth(true);
  };

    

 
  return (
    <AppContext.Provider
      value={{
        auth,
        stopAuth,
        grantAuth,
     
      token,
      setToken,

      setInfo,info,
    
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider ;