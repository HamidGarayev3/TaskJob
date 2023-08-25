import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServiceState {
  api: string;
  username: string;
  password: string;
}

const initialState: ServiceState = {
  api: '',
  username: '',
  password: '',
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setApi: (state, action: PayloadAction<string>) => {
      state.api = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const { setApi, setUsername, setPassword } = serviceSlice.actions;

export default serviceSlice.reducer;
