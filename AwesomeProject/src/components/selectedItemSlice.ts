import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedItemState {
  selectedValue: string ; // Update with the actual type
}

const initialState: SelectedItemState = {
  selectedValue: '',
};

const selectedItemSlice = createSlice({
  name: 'selectedItem',
  initialState,
  reducers: {
    setSelectedValue: (state, action: PayloadAction<string>) => {
      state.selectedValue = action.payload;
    },
  },
});

export const { setSelectedValue } = selectedItemSlice.actions;
export default selectedItemSlice.reducer;
