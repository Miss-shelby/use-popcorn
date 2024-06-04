import { useEffect, useState } from "react"

const CurrencyConveter = () => {
  const [amount,setAmount] = useState(1)
const[currencyOne,setCurrencyOne] = useState('EUR')
const[currencyTwo,setCurrencyTwo] = useState('USD')
const [isLoading,setIsLoading] = useState(false)
const[result,setResult]=useState("")
const [error,setError] = useState("")
const host = 'api.frankfurter.app';

useEffect(()=>{

  // const controller = new AbortController();
const convertMoney=async()=>{
  setIsLoading(true)
  setError(""); // Reset error message

  try {
    const res = await  fetch(`https://${host}/latest?amount=${amount}&from=${currencyOne}&to${currencyTwo}`)

    if(!res.ok) throw Error('sorry something went wrong')
    const data = await res.json()
    setResult(data.rates[currencyTwo])

  
  } catch (err) {
setError(err.message)
    console.log(err.message);
  } finally{
    setIsLoading(false)
  }
}
if(currencyOne==currencyTwo) return setResult(amount);
convertMoney()


},[amount,currencyOne,currencyTwo])

  return (
    <div>
      <div>
      <input type="text" value={amount}  onChange={(e)=>setAmount(Number(e.target.value))} disabled={isLoading}/>
      <select value={currencyOne} onChange={(e)=>setCurrencyOne(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={currencyTwo} onChange={(e)=>setCurrencyTwo(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      { isLoading?<p>loading...</p>:
      error?<p>{error}⚠️⚠️</p>:
       result && <p>{`${amount} ${currencyOne} = ${result} ${currencyTwo}`}</p>
      }
    </div>
    </div>
  )
}

export default CurrencyConveter
