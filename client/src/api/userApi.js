import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/users/' }),
    endpoints: builder => ({
        getUserByEmail: builder.mutation({
            query: data => ({
                url: 'login',
                method: 'POST',
                body: data
            })
        }),

        userRegistration: builder.mutation({
            query: data => ({
                url: 'registration',
                method: 'POST',
                body: data
            })
        }),
    })
});

export const {
    useGetUserByEmailMutation,
    useUserRegistrationMutation
} = userApi;