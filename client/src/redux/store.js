import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";
import errorSlice from "./slices/errorSlice";
import { userApi } from "../api/userApi";

export const store = configureStore({
    reducer: {
        user: userSlice,
        error: errorSlice,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(userApi.middleware)
})