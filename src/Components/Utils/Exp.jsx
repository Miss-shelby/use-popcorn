import  { useEffect, useState } from 'react'

const Exp = () => {
    const[query,setQuery] = useState('')
    useEffect(()=>{
        console.log('After intitial render'); //a
    },[])
    useEffect(()=>{
        console.log('After every  render'); //b
    })

    useEffect(()=>{
        console.log('D'); //c
    },[query]) 


    console.log('During render'); //d
  return (
    <div>
      
    </div>
  )
}

export default Exp
//on the codes above d will run first because runs on renders that is when component mounts,now useeffects 
//wiil run after because they run after componenents mounts,commits and after the browser paints the screen
//the first useffect that will run is a beacuse it appears first on the code 
 // second is b because it comes second


 //Now when we add a state which is query and make changes to it,d will run fess,
 // then b because it dosent have a dependenecy array so it synchronizes with everything,so it runs on every render,a wont run because it dosent run on rerender
 //then lastly c will run because it is synchronized with the state 

