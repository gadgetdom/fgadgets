import {  Route, Routes } from "react-router-dom";
import './App.css';
import { useState } from "react";
import { Navbar } from './components';
import { Home, Download, Tracking } from './components/pages';
import ProductDetails from "./components/pages/ProductDetails";
import { CartProvider } from './components/CartContext';
import { ProductList } from "./components";
import { CheckOut } from './components/pages/CheckOut';
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { AuthProvider } from "./AuthContext";
import { Profile } from "./components/pages/Profile";



function App() {
  const [selectedBrand] = useState('');

  return (
    <AuthProvider>
    <div className="App">
      <CartProvider>
        <ProductList selectedBrand={selectedBrand} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home selectedBrand={selectedBrand} />} />
          <Route path="/download" element={<Download />} />
          <Route path="/track" element={<Tracking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </CartProvider>
    </div>
    </AuthProvider>

    
  );
}

export default App;
