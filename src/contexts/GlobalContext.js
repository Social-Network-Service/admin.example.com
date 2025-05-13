import React, {createContext, useContext, useMemo, useState} from "react";

export const GlobalContext = createContext(null);

export function useGlobal() {
  return useContext(GlobalContext)
}

export function GlobalProvider({children}) {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userMenus, setUserMenus] = useState(null);

  const state = useMemo(() => {
    return {
      isLogin,
      setIsLogin,
      userInfo,
      setUserInfo,
      userMenus,
      setUserMenus,
    }
  }, [])

  return (
    <GlobalContext.Provider value={state}>
      {children}
    </GlobalContext.Provider>
  );
}