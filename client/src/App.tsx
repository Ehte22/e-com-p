<<<<<<< HEAD
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
=======
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductForm from './components/ProductForm';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductForm />} />
    </Routes>
  );
};

export default App;

>>>>>>> b813c898b568045ca06a335e65933e0b28bc1ffc

