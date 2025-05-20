import React, {createContext, useContext, useState} from "react";

export const GlobalContext = createContext(null);

export function useGlobal() {
  return useContext(GlobalContext)
}

export function GlobalProvider({children}) {
  const [userInfo, setUserInfo] = useState(null);
  const [userMenus, setUserMenus] = useState(null);

  // 根据路径查找菜单名称的函数
  const getRouteName = (path) => {
    if (!userMenus || !path) return '';
    
    // 递归查找函数
    const findMenuName = (menus, targetPath) => {
      for (const menu of menus) {
        // 检查当前菜单项
        if (menu.path === targetPath) {
          return menu.name || '';
        }
        
        // 检查子菜单（如果存在）
        if (menu.routes && Array.isArray(menu.routes) && menu.routes.length > 0) {
          const foundName = findMenuName(menu.routes, targetPath);
          if (foundName) return foundName;
        }
      }
      return '';
    };
    
    return findMenuName(userMenus, path);
  };

  const state = {
    userInfo,
    setUserInfo,
    userMenus,
    setUserMenus,
    getRouteName, // 将函数添加到上下文中
  }

  return (
    <GlobalContext.Provider value={state}>
      {children}
    </GlobalContext.Provider>
  );
}