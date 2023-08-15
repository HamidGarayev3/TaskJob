// stockSlice.ts

import { createSlice } from '@reduxjs/toolkit';

const stockSlice = createSlice({
  name: 'stock',
  initialState: { selectedStockName: '' },
  reducers: {
    setSelectedStockName: (state, action) => {
      state.selectedStockName = action.payload;
    },
  },
});

export const { setSelectedStockName } = stockSlice.actions;
export default stockSlice.reducer;
