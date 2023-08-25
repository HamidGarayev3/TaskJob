// store.ts

import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './stockSlice';
import personReducer from './personSlice'; // Import the new reducer
import inventoryReducer from './inventorySlice';
import serviceReducer from './serviceSlice';


const store = configureStore({
  reducer: {
    service: serviceReducer,
    inventory: inventoryReducer,
    stock: stockReducer,
    person: personReducer,
    
    // Add the new reducer
    // other reducers...
  },
});

export default store;
