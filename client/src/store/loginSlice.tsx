import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  value: boolean;
}

const initialState = { value: false } as InitialState;

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state) {
      state.value = true;
    },
    logout(state) {
      state.value = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
