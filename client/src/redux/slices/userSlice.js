import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: '',
    email: '',
    accessToken: '',
    isLogged: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLogged: (state, {payload}) => {
            state.isLogged = payload;
        },
        setAccessToken: (state, {payload}) => {
            state.accessToken = payload;
        },
        setLogin: (state, {payload}) => {
            state.login = payload;
        },
        logout: state => {
            state.login = '';
            state.email = '';
            state.accessToken = '';
            state.isLogged = false;
            localStorage.removeItem('accessToken');
        }
    }
});

export const {
    setIsLogged,
    setAccessToken,
    setLogin,
    logout

} = userSlice.actions;

export default userSlice.reducer;