import React from 'react';
import {useRoutes} from 'react-router-dom';
import {generateRoutes} from "./routes";
import {GlobalContext} from "../contexts/GlobalState";

const Router = ({userInfo, userMenus}) => {
  console.log('--- Render Router ---')

  const routes = generateRoutes(userInfo, userMenus)
  const element = useRoutes(routes);

  return <GlobalContext.Provider value={{name: 'chuck'}}>
    {element}
  </GlobalContext.Provider>;
};

export default Router;