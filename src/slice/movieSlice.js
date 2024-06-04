// movieProductSlice.js
import { createSlice } from '@reduxjs/toolkit';

// The state being defined
const initialState = {
  movies: null,
  watched: null
};

const movieProductSlice = createSlice({
  name: 'movie', // name of your createSLice
  initialState, // the state  being access by your redux toolkit
  reducers: {
    // This is the function, where after taking in your payload, ..
    // .. a logic is then created by the developer for handling the state data 
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    // createMovies: (state, action) => {
    //   state.movies = [state.movies, ...action.payload]
    // },
    setWatched: (state, action) => {
      state.watched = action.payload
    }
  },
});

// export your functons
export const { setMovies, setWatched } = movieProductSlice.actions;
// export your state 
export default movieProductSlice.reducer;
