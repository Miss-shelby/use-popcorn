/* eslint-disable react/prop-types */
import { useState } from "react";
const Navbar = ({children}) => {
   
  return (
    <div>
       <nav className="nav-bar">
       {children}
      </nav>
    </div>
  )
}
export default Navbar


//Navbar logo
export const Logo=()=>{
    return <>
     <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
    </>
}


//Navbar search input
export const Search=({query,setQuery})=>{
    
    return <>
     <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
    </>
}

//Result for Navbar
export const NumResult=({movies})=>{
    return <>
     <p className="num-results">
          Found <strong>{movies?.length}</strong> results
        </p>
        
    </>
}
//lets fix pop drilling by using composition
