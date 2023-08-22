// store.ts

import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './stockSlice';
import personReducer from './personSlice'; // Import the new reducer

const store = configureStore({
  reducer: {
    stock: stockReducer,
    person: personReducer, // Add the new reducer
    // other reducers...
  },
});

export default store;
