import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PersonState {
    selectedPersonName: string;
    selectedPersonID: string; // Add the selectedPersonID field
}

const initialState: PersonState = {
    selectedPersonName: '',
    selectedPersonID: '', // Set initial ID value
};

const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        setSelectedPerson: (state, action: PayloadAction<{ name: string; id: string }>) => {
            state.selectedPersonName = action.payload.name;
            state.selectedPersonID = action.payload.id;
        },
    },
});

export const { setSelectedPerson } = personSlice.actions;

export default personSlice.reducer;
