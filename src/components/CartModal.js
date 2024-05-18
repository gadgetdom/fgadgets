        import React from 'react';
        import './CartModal.css'; // Import the CSS

        export const CartModal = ({ cartItems, closeCart }) => {

        return (
            <div className="cart-modal">
            <button onClick={closeCart}>Close</button>
            <div className="cart-items">
            <h2>My Cart</h2>
            <div className="listCart">
                {cartItems && cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <div className="item" key={item.id}>
                    <div className="image">
                        <img src={item.image} alt={item.name} />
                    </div>
                    <div className="name">{item.name}</div>
                    <div className="totalPrice">NGN {item.price}</div>
                    <div className="quantity">
                        <span className="minus">-</span>
                        <span>{item.quantity}</span>
                        <span className="plus">+</span>
                    </div>
                    </div>
                ))
                ) : (
                <div className="empty-cart-message">Your cart is empty</div>
                )}
            </div>
            <div className="btn">
                <button type="submit" className="checkOut">
                Check Out
                </button>
            </div>
            </div>
        </div>
        );
    };