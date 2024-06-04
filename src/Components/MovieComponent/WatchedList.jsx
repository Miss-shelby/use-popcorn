/* eslint-disable react/prop-types */


//we are using box to render our watched box instead hence why we comment it out
// const WatchedBox = () => {
//     const [watched, setWatched] = useState(tempWatchedData);
//     const [isOpen2, setIsOpen2] = useState(true);
   
//   return (
//     <div className="box">
//     <button
//       className="btn-toggle"
//       onClick={() => setIsOpen2((open) => !open)}
//     >
//       {isOpen2 ? "–" : "+"}
//     </button>
//     {isOpen2 && (
//       <>
//        <WatchedSummary watched={watched}/>
//        <WatchedMovieList watched={watched}/>
       
//       </>
//     )}
//   </div>
//   )
// }

// export default WatchedBox



//Watched summary
export const WatchedSummary=({watched})=>{
    const average = (arr) =>
        arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
      const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
      const avgUserRating = average(watched.map((movie) => movie.userRating));
      const avgRuntime = average(watched.map((movie) => movie.runtime));
    return <>
     <div className="summary">
          <h2>Movies you watched</h2>
          <div>
            <p>
              <span>#️⃣</span>
              <span>{watched.length} movies</span>
            </p>
            <p>
              <span>⭐️</span>
              <span>{avgImdbRating.toFixed(2)}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{avgUserRating.toFixed(2)}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{avgRuntime} min</span>
            </p>
          </div>
        </div>
    </>
}



//WATCHED MOVIE LIST 
export const WatchedMovieList=({watched,onDeleteMovie})=>{
    return <>
     <ul className="list">
          {watched.map((movie) => (
            <WatchedMovie  key={movie.imdbID} movie={movie} onDeleteMovie={onDeleteMovie}/>
          ))}
        </ul>
    </>
}


//A SINGLE WATCHED LIST
export const WatchedMovie = ({movie,onDeleteMovie})=>{
    return (
        <li>
              <img src={movie.poster} alt={`${movie.title} poster`} />
              <h3>{movie.title}</h3>
              <div>
                <p>
                  <span>⭐️</span>
                  <span>{movie.imdbRating}</span>
                </p>
                <p>
                  <span>🌟</span>
                  <span>{movie.userRating}</span>
                </p>
                <p>
                  <span>⏳</span>
                  <span>{movie.runtime} min</span>
                </p>
                <button className="btn-delete" onClick={()=>onDeleteMovie(movie.imdbId)}> x</button>
              </div>
            </li>
    )
}