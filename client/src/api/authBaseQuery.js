import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

import { setAccessToken, logout } from '../redux/slices/userSlice';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().user.accessToken;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

export const authBaseQuery = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);
    console.log('result= ', result);
    if (result.error && result.error.originalStatus === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResult = await baseQuery('/users/refresh', api, extraOptions);
                console.log('refreshResult: ', refreshResult);
                if (refreshResult.data) {
                    api.dispatch(setAccessToken(refreshResult.data.accessToken));
                    console.log('refreshResult.data: ', refreshResult.data);
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    console.log('logout');
                    api.dispatch(logout());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}