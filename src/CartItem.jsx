import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const numericCost = parseFloat(item.cost.replace('$', ''));
      return total + numericCost * item.quantity;
    }, 0).toFixed(2);
  };

  const calculateTotalCost = (item) => {
    const numericCost = parseFloat(item.cost.replace('$', ''));
    return (numericCost * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Shopping Cart</h2>
      <h3 style={{ margin: '15px 0' }}>Total Amount: ${calculateTotalAmount()}</h3>

      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid #ccc', padding: '15px 0' }}>
              <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
              <div style={{ flexGrow: 1 }}>
                <h4>{item.name}</h4>
                <p>Unit Price: {item.cost}</p>
                <p>Subtotal: ${calculateTotalCost(item)}</p>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px' }}>
                  <button onClick={() => handleDecrement(item)} style={{ padding: '4px 10px' }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)} style={{ padding: '4px 10px' }}>+</button>
                  <button onClick={() => handleRemove(item)} style={{ marginLeft: '15px', color: 'red', border: '1px solid red', background: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '25px', display: 'flex', gap: '15px' }}>
        <button onClick={onContinueShopping} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Continue Shopping
        </button>
        <button onClick={() => alert('Functionality to be added for future reference')} style={{ padding: '10px 20px', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
