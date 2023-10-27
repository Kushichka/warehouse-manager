import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const SkipIfLogged = () => {
    const { isLogged } = useSelector(state => state.user); 

    if(isLogged) {
        return <Navigate to='/warehouse' />
    }

    return <Outlet />;
}