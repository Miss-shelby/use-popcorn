// import { useState } from "react";
import Navbar, { Logo, NumResult, Search } from "./Components/Navbar";
import Main from "./Components/MovieComponent/Main";
import { tempMovieData,tempWatchedData} from "./Components/Utils";
import { useEffect, useState } from "react";
import { Movie, MovieList } from "./Components/MovieComponent/Listbox";
import  {
  WatchedMovieList,
  WatchedSummary,
} from "./Components/MovieComponent/WatchedList";
import Box from "./Components/MovieComponent/Listbox";
import MovieDetails from './Components/MovieComponent/MovieDetails'

import Loader from "./Components/LoadingComponent/Loader";
import ErrorMessage from "./Components/ErrorMessage/Error";

//create a variable outside the component function 
//so that each time the component is rendered the variable  wont be executed or created  again
const KEY='49df142e'
const tempQuery ='wednesday'

export default function AppV2() {
  const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState("")
  const [query, setQuery] = useState(tempQuery);
  //a new state to keep track of selected movies using their id
  const[selectedId,setSelectedId]= useState(null)
 

  //we create a callback function to use as the initial value of the state when the component mounts,
  //that way we succesfully store our data(watchedmovie) in local storage and retrive it as the application loads
  const [watched,setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched")
    return JSON.parse(storedValue);
  })
  // const handleSelectedMovieiD = (id)=>{
  //   setSelectedId(id)
  // }

  //to close the movie when users clicks twice on the movie without using the back btn we do:
  const handleSelectedMovieiD = (id)=>{
    setSelectedId((selectedId)=> (id=== selectedId?null : id))
  }


  const handleCloseSelectedMovie = ()=>{
    setSelectedId(null)
  }

  //To populate our watched movie array which is empty now we create a function that will add a new object from our movie details and
  // into our already existing watched array

  const handleWatchedMovie=(movie)=>{
    setWatched((watched)=>[...watched,movie])

    //setting our watched movie to local storage 
    // localStorage.setItem('watched',watched) //if we set it like this we will be setting a stale state,
    //the old version before a new movie is addded so we need to build a new array based on the current state then convert it to a string because in local storage we can only store in strings
    // localStorage.setItem("watched",JSON.stringify([...watched,movie]))


  }

  const handleDeletedMovie=(id)=>{
    setWatched((watched) => watched.filter((movie)=> movie.imdbId !== id))
  }

useEffect(()=>{
  localStorage.setItem("watched",JSON.stringify(watched))
  //so we dont have to update the watched array here because it automatically updates when our effects run
},[watched])

  useEffect(() => {

    // if(!query) return; //we use this to prevent throwing error if theres no search query works same way with line 59
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        
        setIsLoading(true)
        setError("") // we set error to empty string beacuse it throws error even before movie is fetched
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal:controller.signal});

          // This block checks for response errors
        if(!res.ok) throw new Error("Something Went wrong fetching the movies,please try again")

        const data = await res.json();
         // This block checks for specific response errors in the API response
        if(data.Response === 'False') throw new Error('Movies not Found')
        setMovies(data.Search)
        setError("")
        
        setIsLoading(false)
      } catch (err) {
        
        //we want to ignore the error that is coming from the controller here
        if(err.name !== 'AbortError'){
         setError(err.message)

       }
      }
       finally{
      setIsLoading(false)
      }
    };

    if(query.length<3){
      setMovies([])
      setError("")
      return;
    }

    handleCloseSelectedMovie()//we call this function to close our selected movie before we start searching for a new one
    fetchMovies();

    return function(){
      controller.abort()
    }
  }, [query]);


  // useEffect(() => {
  //     fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
  //     .then((res)=> res.json())
  //     .then((data)=>{
  //       setMovies(data.Search)
  //       console.log(data);
  //     })
  // }, []);

  //to handle error we wrap our code in a try catch,
  //the res object  from fetch has an ok property,so we check if it dosent exist,then throw a new error and catch it in the catch block
  //next create a state to handle the error

  // When a network error occurs, the fetch promise rejects directly and jumps to the catch block. 
  // It does not reach the if (!res.ok) check because there's no response to check. hence the reson we are not getting our custom error on the ui when its a network error


  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery}/>
        <NumResult movies={movies} />
      </Navbar>
      <Main>
        <Box>
         {isLoading&& <Loader/>}
         {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectedMovieiD} />}
         {error && <ErrorMessage message={error}/>}
        </Box>
        
        <Box> 
          {selectedId? < MovieDetails selectedId={selectedId} onCloseMovie={handleCloseSelectedMovie}
           onAddWatchedMovie={handleWatchedMovie}
           watched={watched} /> : 
          <>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} onDeleteMovie={handleDeletedMovie}/>
          </>
          }
        </Box>
       
      </Main>
    </>
  );
}
