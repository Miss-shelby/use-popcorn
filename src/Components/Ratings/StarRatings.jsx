/* eslint-disable react/prop-types */
import { useState } from "react"
import Star from "./Star"
import PropTypes from "prop-types"



const StarRatings = ({
  maxRatings=5,
  color='#fcc419',
  size=48,
  messages=[],
  defaultRating=0,
  onSetRating = () => {},
  text='lorem ipsum dolor sit amet,consectetur adipisicing elit. Corporis facere voluptatibus ex magnam accusamus',
}) => {
// const [ratings,setRatings] = useState(0) //old state with 0 as default

const [ratings,setRatings] = useState(defaultRating)
const[tempRatings,setTempRatings] = useState(0)
const handleRating = (ratings)=>{
  setRatings(ratings)
  onSetRating(ratings)
}


//to make our starratings reusable we use props to define styles
//we added messages array incase we want to use message array instaed of number to display our rating value
//next we added a default rating that users would see when they come on the page instead of using 0 
//in our usestate as the defautvalue,we use the default rating variable which is also 0 by default till you change it


const textStyles={
  color,
  fontSize:`${size / 1.5}px`,
  
}

  return (
    <>
    <div className="flex items-center gap-[16px] ">
      <div className="flex ">
        {Array.from({length:maxRatings},(_,i)=>(<Star key={i}
         full={ tempRatings? tempRatings >= i+1 :ratings >=i+1}
         onRate={(()=> handleRating(i+1))}
         onHoverIn= {(()=>setTempRatings(i+1))}
         onHoverOut={(()=>setTempRatings(0))}
         size={size} color={color}
         />
        
         ))}
      </div>
      {/* <p style={textStyles} className='m-0 leading-1 '>{tempRatings || ratings || ''}</p> */}
      <p style={textStyles} className='m-0 leading-1 '>{ messages.length === maxRatings? 
      messages[tempRatings? tempRatings - 1: ratings - 1]
      :
      tempRatings || ratings || ''}</p>
    </div>
    
    </>
  )
}
StarRatings.propTypes={
  maxRatings:PropTypes.number,
  defaultRating:PropTypes.number,
  color:PropTypes.string,
  messages:PropTypes.array,
  size:PropTypes.number,
  onSetRating:PropTypes.func,
}

export default StarRatings


//EXPLANATIONS

// Array.from({length:5},(_,i) => ... ) creates an array with 5 elements. 
// The {length:5} part specifies that the array should have 5 items.
// The second argument is a mapping function (_,i) => ...
//  where _ is a placeholder for the current element (unused here), and i is the index of the current element.
// For each element in the array, a <span> element is created with the content S{i+1}.
// This means it will create <span> elements with the text S1, S2, S3, S4, and S5.

//on line 12 we use short circurting to display empty string ie nothing if the user has not rated
//we dont want the default state of 0 to display,on shortCircuting 0 is a falsey value

//on line 13 full={tempRatings ? tempRatings >= i + 1 : ratings >= i + 1}:
// Determines if the star is filled based on the tempRatings or ratings by checking if temprating or rating
//is greater than or equal to the current star index and this only happens when its clicked or hovered on


// onRate={() => setRatings(i + 1)}: Sets the ratings state when a star is clicked based on the index of the star
// onHoverIn={() => setTempRatings(i + 1)}: Sets the tempRatings state when a star is hovered over.
// onHoverOut={() => setTempRatings(0)}: Resets the tempRatings state when the hover ends.
// A p element displays the current tempRatings or ratings, or an empty string if none.

//we added messages array incase we want to display message based on the rating instead of number 
//To do that we check if the msg array is equal to the max rating,only then we can display it by passing messages
//with the index of rating i.emessages[rating-1] then the rating is -1 because we want it to correct back to 0 index 
//then our 

//we added onsetrating function so we can be able to get the ratings state value outside our ratings component