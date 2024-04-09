import { apiSlice } from "../apiSlice";
import { IUser } from "./user";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserByID: builder.query<IUser, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
    editUserMainInfo: builder.mutation({
      query: (body) => ({
        url: "/users/profile",
        method: "PATCH",
        body,
      }),
    }),
    addProject: builder.mutation({
      query: (body) => ({
        url: "/users/upload-projects",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetUserByIDQuery, useEditUserMainInfoMutation, useAddProjectMutation } =
  usersApiSlice;
