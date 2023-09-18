import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <iframe allow="geolocation" src="https://orianshechter.github.io/blood-donation/" width="800" height="800"></iframe>
    </>
  )
}

export default App
