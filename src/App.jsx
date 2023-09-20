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
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Donate from './Components/Donate/Donate'


//libreries
import { Router, Routes, Route } from 'react-router-dom'
import { useFurniture } from './furnitureContext'

function App() {
    const [count, setCount] = useState(0)
    const data = useFurniture()

    return (
        <>
        <Navbar />
            <Router>
                <Routes path="/" element={ <LandingPage /> } />
                <Routes path="/signUp" element={ <SignUp /> } />
                <Routes path="/homePage" element={ <HomePage /> } />
                <Routes path="/catalog" element={ <Catalog /> } />
                <Routes path="/productPage" element={ <ProductPage /> } />
                <Routes path="/confirmOrder" element={ <ConfirmOrder /> } />
                <Routes path="/orderConfirmed" element={ <OrderConfirmed /> } />
            </Router>
            <Footer />
        </>
    )
}

export default App


    // theme =
    // main: '#00802D',
    // secondary: '#37F715'
