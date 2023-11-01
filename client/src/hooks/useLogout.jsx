import { useDispatch } from "react-redux"

import { logout } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogout = () => {
        dispatch(logout());
        navigate('/');
    }

  return userLogout;
}
