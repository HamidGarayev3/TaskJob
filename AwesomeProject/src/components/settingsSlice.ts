import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface QaimelerItem {
    Mal_Mədaxil?: string;
    Mal_Məxaric?: string;
    // ... other properties
  }
  
  export interface SenedlerItem {
    İnvertar?: string;
    Yerdəyişmə?: string;
    // ... other properties
  }

interface SettingsState {
  qaimelerItems: QaimelerItem[];
  senedlerItems: SenedlerItem[];
}

const initialState: SettingsState = {
  qaimelerItems: [],
  senedlerItems: [],
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setQaimelerItems: (state, action: PayloadAction<QaimelerItem[]>) => {
      state.qaimelerItems = action.payload;
    },
    setSenedlerItems: (state, action: PayloadAction<SenedlerItem[]>) => {
      state.senedlerItems = action.payload;
    },
    // ... other reducers if needed
  },
});

export const { setQaimelerItems, setSenedlerItems } = settingsSlice.actions;

export default settingsSlice.reducer;
