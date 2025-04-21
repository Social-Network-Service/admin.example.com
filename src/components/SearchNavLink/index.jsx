import {useLocation, NavLink} from "react-router-dom";

export function SearchNavLink({to, ...props}) {
    let location = useLocation();
    return <NavLink to={to + location.search} {...props} />;
}