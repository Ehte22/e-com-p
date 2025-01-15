import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Cart from "./components/Cart"
import ProductForm from "./components/ProductForm"

const App = () => {
  return <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<ProductForm />} />

      </Routes>

    </BrowserRouter>
  </>
}

export default App