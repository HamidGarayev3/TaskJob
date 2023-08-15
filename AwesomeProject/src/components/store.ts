// store.ts

import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './stockSlice';

const store = configureStore({
  reducer: {
    stock: stockReducer,
    // other reducers...
  },
});

export default store;
