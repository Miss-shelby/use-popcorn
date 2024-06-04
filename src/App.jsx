// import { useState } from "react";
import Navbar, { Logo, NumResult, Search } from "./Components/Navbar";
import Main from "./Components/MovieComponent/Main";
import { tempMovieData,tempWatchedData} from "./Components/Utils";
import { useState } from "react";
import { MovieList } from "./Components/MovieComponent/Listbox";
import  {
  WatchedMovieList,
  WatchedSummary,
} from "./Components/MovieComponent/WatchedList";
import Box from "./Components/MovieComponent/Listbox";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  
  return (
    <>
      <Navbar>
        <Logo />
        <Search />
        <NumResult movies={movies} />
      </Navbar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        {/* <Box element={<MovieList movies={movies}/>} />  */}
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
        {/* <Box element={<><WatchedSummary watched={watched} /><WatchedMovieList watched={watched} /></>}/> */}
      </Main>
    </>
  );
}
