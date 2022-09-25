import { apiSlice } from '../api/apiSlice';

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get conversations api
    getUser: builder.query({
      query: (email) => `/users?email={${email}}`,
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
