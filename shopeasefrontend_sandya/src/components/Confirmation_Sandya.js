import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const Confirmation_Sandya = ({ setCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state || {}; // Get order details from navigation state
  const { name, email, address, cart = [], orderDate } = orderDetails;

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Handle missing order details
  if (!name || !cart.length) {
    return (
      <div className="container mt-4">
        <h2 className="mb-4">Order Confirmation - Sandya</h2>
        <p>No order details found. <Link to="/">Return to Home</Link>.</p>
      </div>
    );
  }

  // Clear cart and navigate to home
  const handleContinueShopping = () => {
    setCart([]); // Clear the cart state
    localStorage.removeItem('cart_Sandya'); // Clear localStorage to remove cart items
    navigate('/'); // Navigate back to home
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Order Confirmation - Sandya</h2>
      <div className="card">
        <div className="card-header bg-success text-white">
          <h4>Thank You, {name}!</h4>
        </div>
        <div className="card-body">
          <p>Your order has been successfully placed on {orderDate}.</p>
          <h5>Shipping Information</h5>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Address:</strong> {address}</p>

          <h5>Order Summary</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 className="text-end">Total: ${calculateTotal()}</h4>
        </div>
        <div className="card-footer text-center">
          <button className="btn btn-primary" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation_Sandya;