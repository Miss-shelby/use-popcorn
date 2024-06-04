/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import StarRatings from "../Ratings/StarRatings";
import Loader from "../LoadingComponent/Loader";

const KEY = "49df142e";
const MovieDetails = ({
  selectedId,
  onCloseMovie,
  onAddWatchedMovie,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);

  const watchedMovieUsserRating = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;

  //destructure the movie details we need
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  //function that will call the onAddWatchedMovie we passed as props,
  //rememeber it takes an argument,so we create a movie object from our movie details and pass it as the value here
  const handleAdd = () => {
    const newWatchedMovie = {
      imdbId: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatchedMovie(newWatchedMovie);
    //we also call the onclosemovie function here to immediately takes the user back to show the movie they added

    onCloseMovie();
  };


  useEffect(() => {
    function callBack(e) {
      if (e.code === "Escape") {
        onCloseMovie();
        console.log("Closing with esc key");
      }
    }

    // Attach the event listener
    document.addEventListener("keydown", callBack);
    
    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("keydown", callBack);
    };
  }, [onCloseMovie]);



  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      console.log(data);
      setIsLoading(false);
    };

    
    getMovieDetails();
  }, [selectedId]);

  //another useeffect to change the browser title to the movie name
  //because our movie array takes time to update we added line 65 so that our movie title wont show undefined till our movie is fetched

  useEffect(()=>{
    if(!title) return;
    document.title=`Movie | ${title}`
    console.log('Setting document title:', `Movie | ${title}`);
    //cleanup function,so that the title refers back to usepopcorn after component unmounts

    return ()=> {
      document.title='usePopcorn🍿';
      console.log('Cleaning up, resetting title to usePopcorn🍿');
    };
  },
  [title]
);
  

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`${movie} movie poster`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}{" "}
              </p>
              <p>{genre}</p>
              <p>
                {" "}
                <span>⭐</span>
                {imdbRating} imdb rating
              </p>
            </div>
          </header>
          <section>
            {!isWatched ? (
              <>
                <StarRatings
                  maxRatings={10}
                  size={24}
                  onSetRating={setUserRating}
                />
                {userRating > 0 && (
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to List
                  </button>
                )}
              </>
            ) : (
              <p>You already rated this movie {watchedMovieUsserRating}⭐</p>
            )}
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;

//to load infromation about movie,we make another api request using our selectedid as the query
