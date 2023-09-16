// inventarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InventarState {
  isOkPressed: boolean;
}

const initialState: InventarState = {
  isOkPressed: false,
};

const inventarSlice = createSlice({
  name: 'inventar',
  initialState,
  reducers: {
    setOkPressed: (state, action: PayloadAction<boolean>) => {
      state.isOkPressed = action.payload;
    },
  },
});

export const { setOkPressed } = inventarSlice.actions;
export default inventarSlice.reducer;
