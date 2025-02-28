import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList_Sandya = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedProductId, setAddedProductId] = useState(null); // Track added product

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProductId(product.id); // Show "Added!" temporarily
    setTimeout(() => setAddedProductId(null), 1000); // Reset after 1 second
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">ShopEase Products - Sandya</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price.toFixed(2)}</p>
                <p className="card-text">Stock: {product.stock}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  {addedProductId === product.id ? 'Added!' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList_Sandya;