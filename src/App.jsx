import './App.css'
//hooks
import { useState } from 'react'

//components
import LandingPage from LandingPage
import SignUp from SignUp
import HomePage from HomePage
import Catalog from Catalog
import ProductPage from ProductPage
import ConfirmOrder from ConfirmOrder
import OrderConfirmed from OrderConfirmed

//libreries
import { Router, Routes } from 'react-router-dom'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Router>
                <Routes path="/" element={ <LandingPage /> } />
                <Routes path="/signUp" element={ <SignUp /> } />
                <Routes path="/homePage" element={ <HomePage /> } />
                <Routes path="/catalog" element={ <Catalog /> } />
                <Routes path="/productPage" element={ <ProductPage /> } />
                <Routes path="/confirmOrder" element={ <ConfirmOrder /> } />
                <Routes path="/orderConfirmed" element={ <OrderConfirmed /> } />
            </Router>
        </>
    )
}

export default App
