import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const checkoutSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  address: Yup.string()
    .min(10, 'Address must be at least 10 characters')
    .required('Address is required'),
});

const Checkout_Sandya = ({ cart, setCart }) => {
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    const orderDetails = { ...values, cart, orderDate: new Date().toLocaleString() };
    setTimeout(() => {
      console.log('Order submitted:', orderDetails);
      setSubmitting(false);
      navigate('/confirmation', { state: orderDetails }); // Pass order details, don’t clear cart here after ordeer confirmation
    }, 1000);
  };

  // If cart is empty, prompt to go back
  if (cart.length === 0) {
    return (
      <div className="container mt-4">
        <h2 className="mb-4">Checkout - Sandya</h2>
        <p>Your cart is empty. Please add items before checking out.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Checkout - Sandya</h2>
      <Formik
        initialValues={{ name: '', email: '', address: '' }}
        validationSchema={checkoutSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <Field
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your full name"
              />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <Field
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">Shipping Address</label>
              <Field
                as="textarea"
                name="address"
                className="form-control"
                placeholder="Enter your shipping address"
                rows="3"
              />
              <ErrorMessage name="address" component="div" className="text-danger" />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Place Order'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Checkout_Sandya;