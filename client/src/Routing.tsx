import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Hero from "./pages/Hero"
import Product from "./pages/Product"
import ProductDetail from "./DesignCompo/ProductDetail"
import React from "react"
import Cart from "./DesignCompo/Cart"
import Checkout from "./DesignCompo/Checkout"
import ConfirmationSuccess from "./DesignCompo/ConfirmationSuccess"
import NotFound from "./DesignCompo/NotFound"
import UserProfile from "./DesignCompo/UserProfile"
import Categories from "./DesignCompo/Categories"

const Routing: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <div className="fixed w-[100%] z-30">
                    <Navbar />
                </div>
                <Routes>
                    <Route path='/' element={<Hero />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/navbar' element={<Navbar />} />
                    <Route path='/details/:id' element={<ProductDetail />} />
                    <Route path='/product' element={<Product />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/footer' element={<Footer />} />
                    <Route path='/profile' element={<UserProfile />} />
                    <Route path='/categories' element={<Categories />} />
                    <Route path='/confirmation' element={<ConfirmationSuccess />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing