// stockSlice.ts

import { createSlice } from '@reduxjs/toolkit';

const stockSlice2 = createSlice({
  name: 'stock',
  initialState: { selectedStockName: '' },
  reducers: {
    setSelectedStockName: (state, action) => {
      state.selectedStockName = action.payload;
    },
  },
});

export const { setSelectedStockName } = stockSlice2.actions;
export default stockSlice2.reducer;
