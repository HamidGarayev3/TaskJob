// tabSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TabState {
  scanTabActive: boolean;
}

const initialState: TabState = {
  scanTabActive: false, // Initially, the "Scan" tab is not active.
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setScanTabActive: (state, action: PayloadAction<boolean>) => {
      state.scanTabActive = action.payload;
    },
  },
});

export const { setScanTabActive } = tabSlice.actions;

export default tabSlice.reducer;
