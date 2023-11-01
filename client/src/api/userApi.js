import { createApi } from '@reduxjs/toolkit/query/react';

import { authBaseQuery } from './authBaseQuery';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: authBaseQuery,
    tagTypes: ['User'],
    endpoints: builder => ({
        getUserByEmail: builder.mutation({
            query: data => ({
                url: '/users/login',
                method: 'POST',
                body: data
            })
        }),
        userRegistration: builder.mutation({
            query: data => ({
                url: '/users/registration',
                method: 'POST',
                body: data
            })
        }),
        getEmployees: builder.query({
            query: () => '/admin'
        })
    })
});

export const {
    useGetUserByEmailMutation,
    useUserRegistrationMutation,
    useGetEmployeesQuery
} = userApi;