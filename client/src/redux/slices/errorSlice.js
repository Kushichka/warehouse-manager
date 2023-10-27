import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: ''
};

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, { payload }) => {
            state.message = payload;
        }
    }
});

export const {
    setError
} = errorSlice.actions;

export default errorSlice.reducer;