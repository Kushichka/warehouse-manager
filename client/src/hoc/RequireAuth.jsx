import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const RequireAuth = () => {
    const { isLogged } = useSelector(state => state.user); 

    if(!isLogged) {
        return <Navigate to='/login' />
    }

    return <Outlet />;
}