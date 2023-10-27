import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: '',
    email: '',
    token: '',
    isLogged: true
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLogged: (state, {payload}) => {
            state.isLogged = payload;
        }
    }
});

export const {
    setIsLogged
} = userSlice.actions;

export default userSlice.reducer;