import React, { useState } from "react";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      description:
        "Premium quality wireless headphones with noise cancellation",
      inStock: true,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      description: "Advanced fitness tracking with heart rate monitor and GPS",
      inStock: true,
    },
    {
      id: 3,
      name: "Portable Power Bank",
      price: 29.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop",
      description: "10000mAh fast charging power bank with dual USB ports",
      inStock: false,
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="shopping-cart">
      {/* Header Box */}
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <div className="cart-summary">
          <span className="item-count">{getTotalItems()} items</span>
          <span className="total-price">${getTotalPrice()}</span>
        </div>
      </div>

      {/* Cart Items */}
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            {/* Left side - Image */}
            <div className="item-image">
              <img src={item.image} alt={item.name} />
              {!item.inStock && (
                <div className="out-of-stock-overlay">Out of Stock</div>
              )}
            </div>

            {/* Right side - Content */}
            <div className="item-content">
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <div className="item-status">
                  {item.inStock ? (
                    <span className="in-stock">✓ In Stock</span>
                  ) : (
                    <span className="out-of-stock">⚠ Out of Stock</span>
                  )}
                </div>
              </div>

              <div className="item-actions">
                <div className="price-section">
                  <span className="item-price">${item.price}</span>
                  <span className="item-total">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <div className="quantity-controls">
                  <label>Quantity:</label>
                  <div className="quantity-input">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={!item.inStock}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={!item.inStock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="action-buttons">
                  <button className="save-later-btn" disabled={!item.inStock}>
                    Save for Later
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Footer */}
      <div className="cart-footer">
        <div className="checkout-section">
          <div className="subtotal">
            <span>
              Subtotal ({getTotalItems()} items):{" "}
              <strong>${getTotalPrice()}</strong>
            </span>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
