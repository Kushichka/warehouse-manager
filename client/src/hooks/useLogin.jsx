import { useDispatch } from "react-redux"

import { setAccessToken, setIsLogged, setLogin } from "../redux/slices/userSlice";

export const useLogin = () => {
    const dispatch = useDispatch();

    const userLogin = (data) => {
        dispatch(setIsLogged(true));
        dispatch(setAccessToken(data.accessToken));
        dispatch(setLogin(data.user.login));
    }

    return userLogin;
}
