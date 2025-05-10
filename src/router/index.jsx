import React from 'react';
import {useRoutes} from 'react-router-dom';
import {generateRoutes} from "./routes";
import {GlobalProvider} from "../contexts/GlobalContext";

const Router = ({userInfo, userMenus}) => {
  console.log('--- Render Router ---')
  const routes = generateRoutes(userInfo, userMenus)
  const element = useRoutes(routes);

  return (
    <GlobalProvider>
      {element}
    </GlobalProvider>
  );
};

export default Router;