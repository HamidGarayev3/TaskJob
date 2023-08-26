import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define your Item type here
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
    // Other reducer cases...
  },
});

export const { addItem } = inventorySlice.actions;

export default inventorySlice.reducer;
