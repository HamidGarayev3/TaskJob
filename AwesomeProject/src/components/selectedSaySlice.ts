// selectedSaySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedSayState {
  selectedSay: number | null;
}

const initialState: SelectedSayState = {
  selectedSay: null,
};

const selectedSaySlice = createSlice({
  name: 'selectedSay',
  initialState,
  reducers: {
    setSelectedSay: (state, action: PayloadAction<number>) => {
      state.selectedSay = action.payload;
    },
  },
});

export const { setSelectedSay } = selectedSaySlice.actions;
export default selectedSaySlice.reducer;
