import React from 'react';
import { Link } from 'react-router-dom';

const Cart_Sandya = ({ cart, setCart }) => {
  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Update quantity of an item
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 0) return; // Prevent negative quantities
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ).filter((item) => item.quantity > 0) // Remove items if quantity becomes 0
    );
  };

  // Remove an item from the cart
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Handle case when cart is empty
  if (cart.length === 0) {
    return (
      <div className="container mt-4">
        <h2 className="mb-4">Cart - Sandya</h2>
        <p>Your cart is empty. <Link to="/">Go back to shopping</Link>.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Cart - Sandya</h2>
      <div className="row">
        <div className="col-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <div className="input-group w-50">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control text-center"
                        value={item.quantity}
                        min="0"
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-end">
          <h4>Total: ${calculateTotal()}</h4>
          <Link to="/checkout" className="btn btn-success mt-3">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart_Sandya;