// inventorySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  Barcode: string | number;
  Name: string;
  ID: number;
  InPrice: number;
  Stock: number;
  // Add other properties as needed
}

interface InventoryState {
  items: Item[];
}

const initialState: InventoryState = {
  items: [],
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addItem } = inventorySlice.actions;
export default inventorySlice.reducer;
