// SelectedCardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedCardState {
  selectedIndex: number | null;
}

const initialState: SelectedCardState = {
  selectedIndex: null,
};

const selectedCardSlice = createSlice({
  name: 'selectedCard',
  initialState,
  reducers: {
    setSelectedIndex: (state, action: PayloadAction<number | null>) => {
      state.selectedIndex = action.payload;
    },
  },
});

export const { setSelectedIndex } = selectedCardSlice.actions;

export default selectedCardSlice.reducer;
