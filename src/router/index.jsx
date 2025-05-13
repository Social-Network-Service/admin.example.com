import {Navigate, useLocation, useNavigate, useRoutes} from 'react-router-dom';
import {generateRoutes} from "./routes";
import {useGlobal} from "../contexts/GlobalContext";
import React, {useEffect, useState} from "react";
import {isAuthenticated} from "@/utils";
import {System} from "services/modules/System";

export default function Router() {
  console.log('--- Render Router ---')
  const state = useGlobal()
  // console.log({state});
  const {userInfo, userMenus, setUserInfo, setUserMenus} = state;
  const navigate = useNavigate()
  const location = useLocation()
  const {pathname} = location
  const [routeList, setRouteList] = useState([])
  let isUnmount = false

  const routeGuard = async () => {
    if (!isUnmount) {
      const hasToken = isAuthenticated();
      if (hasToken) {
        if (pathname == '/login') {
          navigate('/')
        } else {
          if (!userInfo || !userMenus) {
            async function fetchData() {
              // 获取用户的基本信息
              const {data: userInfo} = await System.getUserInfo();
              // 获取用户的权限数据
              const {data: userMenus} = await System.getUserMenus();
              setUserInfo(userInfo)
              setUserMenus(userMenus)
              console.log({userInfo, userMenus});
            }

            await fetchData();
          }
        }
      }
    }
  }

  useEffect(() => {
    routeGuard()
    return () => isUnmount = true
  }, [pathname])

  return <DynamicRouter/>
}

export function DynamicRouter() {
  console.log('--- Render DynamicRouter ---')
  const state = useGlobal()
  console.log({state});
  const {userInfo, userMenus} = state;
  const location = useLocation();
  const routes = generateRoutes(userInfo, userMenus)
  const element = useRoutes(routes);

  console.log(location.pathname);

  return (element);
};
