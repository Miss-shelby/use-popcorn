import React from 'react'
import ReactDOM from 'react-dom/client'
// import StarRatings from './Components/Ratings/StarRatings'
// import App from './App.jsx'
import './index.css'
// import MovieRating from './Components/MovieRating'
import App from './AppV1'
import { Provider } from 'react-redux'
import store from './store'
import CurrencyConveter from './CurrencyConverter'
// import App2 from './Appv2'
import AppV2 from './AppV2'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <MovieRating/>
    <StarRatings maxRatings={10}/>
    <StarRatings maxRatings={5} color='red' size={24} messages={['Terrible','Bad','Okay','Good','Amazing']} />
    <StarRatings maxRatings={6} color='green' size={20} defaultRating={3}/>
    <StarRatings maxRatings={6} color='brown' size={18} defaultRating={2}  messages={['Terrible😖','Bad😔','Okay👍','fair😑','Good😌','Amazing😁']}/> */}
    {/* <App /> */}
{/* <CurrencyConveter/> */}
      {/* <App/> */}
    <AppV2/>

  </React.StrictMode>,
)
