import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSlice from "./slices/userSlice";
import errorSlice from "./slices/errorSlice";
import { userApi } from "../api/userApi";

const persistConfig = {
    key: 'root',
    storage
};

const rootReducer = combineReducers({
    user: userSlice,
    error: errorSlice,
    [userApi.reducerPath]: userApi.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({serializableCheck: false}).concat(userApi.middleware)
});

export const persistor = persistStore(store);