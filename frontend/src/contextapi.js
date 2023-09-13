import React, { createContext, useState } from 'react'

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=> {
   const [auth, setauth] = useState();
    return (
    <AuthContext.Provider value={{auth, setauth}} >
        {children}
    </AuthContext.Provider>    
  )
};

