import './App.css'
//hooks
import { useState } from 'react'

//components
import LandingPage from './Components/LandingPage/LandingPage'
import SignUp from './Components/SignUp/SignUp'
import HomePage from './Components/HomePage/HomePage'
import Catalog from './Components/Catalog/Catalog'
import ProductPage from './Components/ProductPage/ProductPage'
import ConfirmOrder from './Components/ConfirmOrder/ConfirmOrder'
import OrderConfirmed from './Components/OrderConfirmed/OrderConfirmed'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Donate from './Components/Donate/Donate'

//libreries
import { Router, Routes, Route } from 'react-router-dom'
import { useFurniture } from './furnitureContext'

function App() {
  const [count, setCount] = useState(0)
  const data = useFurniture()
  
console.log(data);
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/productPage" element={<ProductPage />} />
        <Route path="/confirmOrder" element={<ConfirmOrder />} />
        <Route path="/orderConfirmed" element={<OrderConfirmed />} />
        <Route path="/Donate" element={<Donate />} />
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
