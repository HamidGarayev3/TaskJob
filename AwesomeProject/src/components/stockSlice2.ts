import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockState {
    selectedStockName: string;
    selectedStockID: string;
}

const initialState: StockState = {
    selectedStockName: '',
    selectedStockID: '',
};

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        setSelectedStock: (state, action: PayloadAction<{ name: string; id: string }>) => {
            state.selectedStockName = action.payload.name;
            state.selectedStockID = action.payload.id;
        },
    },
});

export const { setSelectedStock } = stockSlice.actions;

export default stockSlice.reducer;
