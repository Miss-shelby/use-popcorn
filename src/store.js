// store.js
import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slice/movieSlice';

// Creates the system that enables te dispersing of state data
const store = configureStore({
  reducer: {
    // this passes your state data out to your system for global access
    movie: movieReducer, 
  },
  devTools: true,
});

export default store;
