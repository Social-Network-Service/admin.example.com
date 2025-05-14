import {useLocation, useNavigate, useRoutes} from 'react-router-dom';
import {constantRoutesList} from "./routes";
import {asyncGenerateRoutes} from "./dynamicRouter";
import {useGlobal} from "../contexts/GlobalContext";
import {useEffect, useState} from "react";
import {isAuthenticated} from "@/utils";
import {System} from "services/modules/System";

export default function Router() {
  console.log('--- Render Router ---')
  const {userInfo, userMenus, setUserInfo, setUserMenus} = useGlobal();
  const navigate = useNavigate()
  const location = useLocation()
  const {pathname} = location
  const [routes, setRoutes] = useState(constantRoutesList)
  // console.log({routes})

  const routeGuard = async () => {
    const hasToken = isAuthenticated();
    if (hasToken) {
      if (pathname == '/login') {
        navigate('/')
      } else {
        if (!userInfo || !userMenus) {
          async function fetchData() {
            const {data: userInfo} = await System.getUserInfo();
            const {data: userMenus} = await System.getUserMenus();
            setUserInfo(userInfo);
            setUserMenus(userMenus);

            const dynamicRoutes = asyncGenerateRoutes(userMenus);
            setRoutes([...constantRoutesList, ...dynamicRoutes]);
          }

          await fetchData();
        }
      }
    } else {
      navigate('/login', {replace: true})
    }
  }

  useEffect(() => {
    routeGuard()
  }, [pathname])

  return useRoutes(routes)
}