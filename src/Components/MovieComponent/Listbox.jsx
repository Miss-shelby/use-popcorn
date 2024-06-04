/* eslint-disable react/prop-types */



// import { useState } from 'react';
// const Listbox = ({children}) => {
//     const [isOpen1, setIsOpen1] = useState(true);
//   return (
//     <div className="box">
//           <button
//             className="btn-toggle"
//             onClick={() => setIsOpen1((open) => !open)}
//           >
//             {isOpen1 ? "–" : "+"}
//           </button>
//           {isOpen1 && (
//             children
//           )}
//         </div>
//   )
// }
// export default Listbox



//reusing/restructuring  our listbox to use  as  watched box
import { useState } from 'react';
const Box = ({children}) => {
    const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
          <button  className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "–" : "+"}
          </button>
          {isOpen && (
            children
          )}
        </div>
  )
}
export default Box


//WE CAN PASS IN ELEMENT AS PROP INSTEAD OF USING CHILDREN here is an example of how it is done

// import { useState } from 'react';
// const Box = ({element}) => {
//     const [isOpen, setIsOpen] = useState(true);
//   return (
//     <div className="box">
//           <button
//             className="btn-toggle"
//             onClick={() => setIsOpen((open) => !open)}
//           >
//             {isOpen ? "–" : "+"}
//           </button>
//           {isOpen && (
//            element
//           )}
//         </div>
//   )
// }
// export default Box



//MOVIE LIST
export const MovieList=({movies,onSelectMovie})=>{
  
    return (
    <>
    <ul className="list list-movies">
              {movies?.map((movie) => (
               <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie}/>
              ))}
            </ul>
    </>
    )
}



//MOVIE
export const Movie=({movie,onSelectMovie})=>{
    return (
        <>
         <li onClick={()=>onSelectMovie(movie.imdbID)}>
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                  <h3>{movie.Title}</h3>
                  <div>
                    <p>
                      <span>🗓</span>
                      <span>{movie.Year}</span>
                    </p>
                  </div>
                </li>
        </>
    )
}