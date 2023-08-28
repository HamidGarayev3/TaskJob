// Create a new slice for authentication
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false, // Initially, the user is not logged in
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
