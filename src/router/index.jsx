import {useRoutes} from 'react-router-dom';
import {routes} from "./routes";

const Router = () => {
    console.log('--- Render Router ---')
    const element = useRoutes(routes);
    return element;
};

export default Router;