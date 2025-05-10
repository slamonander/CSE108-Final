import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import ProductList from './ProductList';
import HomeImage from './HomeImage';
import Cart from './Cart';
import LoginSignUp from './LoginSignUp';
import Product from './Product';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path ="/cart" element={<Cart />} />
        <Route path ="/login" element={<LoginSignUp />} />
        <Route path ="/" element={<HomeImage />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;