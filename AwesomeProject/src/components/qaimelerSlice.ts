// qaimelerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QaimelerItem {
  id: number;
  name: string;
}

interface SenedlerItem {
  id: number;
  name: string;
}

interface SettingsState {
  qaimeler: QaimelerItem[];
  senedler: SenedlerItem[];
}

const initialState: SettingsState = {
  qaimeler: [],
  senedler: [],
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setQaimelerItems: (state, action: PayloadAction<QaimelerItem[]>) => {
      state.qaimeler = action.payload;
    },
    setSenedlerItems: (state, action: PayloadAction<SenedlerItem[]>) => {
      state.senedler = action.payload;
    },
  },
});

export const { setQaimelerItems, setSenedlerItems } = settingsSlice.actions;
export default settingsSlice.reducer;
