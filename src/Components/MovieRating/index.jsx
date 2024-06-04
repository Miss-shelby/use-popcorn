
import { useState } from 'react'
import StarRatings from '../Ratings/StarRatings'

const MovieRating = () => {
    const [movieRating,setMovieRating] = useState(0)
  return (
    <div>
        <StarRatings maxRatings={5} color='blue' size={30} onSetRating={setMovieRating}/>
        <p>This Movie was rated {movieRating} stars</p>
    </div>
  )
}

export default MovieRating
//how do we update the movie rating number as the user rates to match the ratings we have as 
// and display  show in our ui,so therefore we create pass a props to update the setmovie rating 