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


