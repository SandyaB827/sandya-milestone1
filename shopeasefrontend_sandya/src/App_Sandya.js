import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar_Sandya from './components/Navbar_Sandya';
import ProductList_Sandya from './components/ProductList_Sandya';
import Cart_Sandya from './components/Cart_Sandya';
import Checkout_Sandya from './components/Checkout_Sandya';
import Confirmation_Sandya from './components/Confirmation_Sandya';
import ProtectedRoute_Sandya from './components/ProtectedRoute_Sandya';

const App_Sandya = () => {
  // Initialize cart from localStorage or default to empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart_Sandya');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart_Sandya', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <Router>
      <div className="App">
        <Navbar_Sandya cart={cart} />
        <Routes>
          <Route exact path="/" element={<ProductList_Sandya addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart_Sandya cart={cart} setCart={setCart} />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute_Sandya cart={cart}>
                <Checkout_Sandya cart={cart} setCart={setCart} />
              </ProtectedRoute_Sandya>
            }
          />
          <Route path="/confirmation" element={<Confirmation_Sandya setCart={setCart} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App_Sandya;