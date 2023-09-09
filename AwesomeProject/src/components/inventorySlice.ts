import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define your Item type here
interface Item {
  Barcode: string | number;
  Name: string;
  ID: number;
  InPrice: number;
  Stock: number;
  Say: number;
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
      const newItem = {
        ...action.payload,
        Say: 1,
      };
      state.items.push(newItem);
    },
    updateSay: (state, action: PayloadAction<{ itemId: number; newSay: number }>) => {
      const { itemId, newSay } = action.payload;
      const itemToUpdate = state.items.find((item) => item.ID === itemId);
      if (itemToUpdate) {
        itemToUpdate.Say = newSay;
      }
    },
    // Other reducer cases...
  },
});

export const { addItem, updateSay } = inventorySlice.actions;

export default inventorySlice.reducer;
