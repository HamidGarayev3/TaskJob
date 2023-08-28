// store.ts

import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './stockSlice';
import personReducer from './personSlice'; // Import the new reducer
import inventoryReducer from './inventorySlice';
import serviceReducer from './serviceSlice';
import authReducer from './authSlice'; // Import the new auth reducer
import qaimelerReducer from './qaimelerSlice';
import settingsReducer from './settingsSlice'; // Import the settings reducer






const store = configureStore({
  reducer: {
    qaimeler: qaimelerReducer,
    service: serviceReducer,
    inventory: inventoryReducer,
    stock: stockReducer,
    person: personReducer,
    auth: authReducer, // Add the new auth reducer
    settings: settingsReducer, // Add the settings reducer


    // Add the new reducer
    // other reducers...
  },
});


// Define your own AppDispatch type
export type AppDispatch = typeof store.dispatch;

// Define a type for Thunk actions

export type RootState = ReturnType<typeof store.getState>;


export default store;
