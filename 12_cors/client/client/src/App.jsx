import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [product, setProduct] = useState([])
  
  const fetchData = () => {
    fetch("http://localhost:8000", {
      method: "GET"
    }).then((res) => {
      res.json().then(data => console.log(data))
    })
  }

  return (
    <>
      <div>
        <button onClick={fetchData}>Get data</button>
        
      </div>
    </>
  )
}

export default App