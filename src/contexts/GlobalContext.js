import React, {createContext, useContext, useMemo, useState} from "react";

export const GlobalContext = createContext(null);

export function useGlobal() {
  return useContext(GlobalContext)
}

export function GlobalProvider({children}) {
  const [userInfo, setUserInfo] = useState(null);
  const [userMenus, setUserMenus] = useState(null);

  const state = {
    userInfo,
    setUserInfo,
    userMenus,
    setUserMenus,
  }

  return (
    <GlobalContext.Provider value={state}>
      {children}
    </GlobalContext.Provider>
  );
}