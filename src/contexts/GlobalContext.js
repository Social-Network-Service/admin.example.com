import {createContext, useContext} from "react";

export const GlobalContext = createContext(null);

export function useGlobal() {
  return useContext(GlobalContext)
}

export function GlobalProvider({children}) {
  return (
    <GlobalContext.Provider value={{name: 'chuck'}}>
      {children}
    </GlobalContext.Provider>
  );
}