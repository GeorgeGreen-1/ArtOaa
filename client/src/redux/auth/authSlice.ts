import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ILoggedUser } from "./auth";

type InitialState = {
  token: string | null;
  loggedUser: ILoggedUser | null;
};

const initialState: InitialState = {
  token: null,
  loggedUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    clearCredentials: (state) => {
      state.token = null;
    },
    setUser: (state, action) => {
      state.loggedUser = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, setUser } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.loggedUser;
