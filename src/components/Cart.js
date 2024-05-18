import React, { useContext } from 'react';
import { CartContext } from './CartContext'; // Import the context

export const Cart = () => {
    const { cart } = useContext(CartContext); // Use the context

    return (
        <div className="cart">
            {cart.map((item, index) => (
                <div key={index}>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                </div>
            ))}
        </div>
    );
}
