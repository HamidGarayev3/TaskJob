import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define your Item type here
interface Product {
  ProductID: string;
  ProductName: string;
  Barcode: string;
  Stock: string | null;
  InPrice: string | null;
  OutPrice: string | null;
  TopPrice: string | null;
  StockPrice: string | null;
  TypPrice: string | null;
  ProductControl: string | null;
  Say:number;
}

interface InventoryState {
  items: Product[];
}

const initialState: InventoryState = {
  items: [],
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const newItem = {
        ...action.payload,
        Say: 1,
      };
      state.items.push(newItem);
    },
    updateSay: (state, action: PayloadAction<{ itemId: string; newSay: number }>) => {
      const { itemId, newSay } = action.payload;
      const itemToUpdate = state.items.find((item) => item.ProductID === itemId);
      if (itemToUpdate) {
        itemToUpdate.Say = newSay;
      }
    },
    clearItems: (state) => {
      state.items = [];
    },
    deleteItem: (state, action) => {
      // Remove the item with the specified ID from the items array
      state.items = state.items.filter((item) => item.ProductID !== action.payload);
    },
    // Other reducer cases...
  },
});

export const { addItem, updateSay,clearItems,deleteItem } = inventorySlice.actions;

export default inventorySlice.reducer;
