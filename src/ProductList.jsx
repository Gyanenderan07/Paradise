import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/05/16/06/spider-plant-3518588_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12"
        }
      ]
    },
    {
      category: "Aromatic",
      plants: [
        {
          name: "Lavender",
          image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=600&q=80",
          description: "Calming scent, popular for relaxation.",
          cost: "$20"
        },
        {
          name: "Jasmine",
          image: "https://images.unsplash.com/photo-1592729961255-cc3a4469978b?auto=format&fit=crop&w=600&q=80",
          description: "Sweet fragrance with beautiful white flowers.",
          cost: "$18"
        }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isAddedToCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      <div className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: '#2e7d32', color: 'white' }}>
        <h2 style={{ cursor: 'pointer' }} onClick={() => setShowCart(false)}>Paradise Nursery</h2>
        <div style={{ cursor: 'pointer' }} onClick={() => setShowCart(true)}>
          🛒 Cart ({totalQuantity})
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid" style={{ padding: '20px' }}>
          {plantsArray.map((categoryGroup, index) => (
            <div key={index}>
              <h2>{categoryGroup.category}</h2>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
                {categoryGroup.plants.map((plant, pIndex) => (
                  <div key={pIndex} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', width: '220px', textAlign: 'center' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                    <h3 style={{ marginTop: '10px' }}>{plant.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#555', margin: '8px 0' }}>{plant.description}</p>
                    <p style={{ fontWeight: 'bold', margin: '8px 0' }}>{plant.cost}</p>
                    <button 
                      onClick={() => handleAddToCart(plant)}
                      disabled={isAddedToCart(plant.name)}
                      style={{ padding: '8px 16px', backgroundColor: isAddedToCart(plant.name) ? '#888' : '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', cursor: isAddedToCart(plant.name) ? 'not-allowed' : 'pointer' }}
                    >
                      {isAddedToCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
