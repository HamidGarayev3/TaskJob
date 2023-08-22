// personSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PersonState {
    selectedPersonName: string;
}

const initialState: PersonState = {
    selectedPersonName: '',
};

const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        setSelectedPersonName: (state, action: PayloadAction<string>) => {
            state.selectedPersonName = action.payload;
        },
    },
});

export const { setSelectedPersonName } = personSlice.actions;

export default personSlice.reducer;
