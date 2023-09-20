import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MalMedaxilState {
  isPlusButtonPressed: boolean;
}

const initialState: MalMedaxilState = {
  isPlusButtonPressed: false,
};

const malMedaxilSlice = createSlice({
  name: 'malMedaxil',
  initialState,
  reducers: {
    setPlusButtonPressed: (state, action: PayloadAction<boolean>) => {
      state.isPlusButtonPressed = action.payload;
    },
  },
});

export const { setPlusButtonPressed } = malMedaxilSlice.actions;

export default malMedaxilSlice.reducer;
