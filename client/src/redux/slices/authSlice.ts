import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
// import { authApi } from "../api/authApi";

// Define the type for your state
export interface SliceState {
  user: string | null;
}

const initialState: SliceState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    })
    .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.user = null;
    });
  },
});

export default authSlice.reducer;
