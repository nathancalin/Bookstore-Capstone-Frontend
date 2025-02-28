import React, { useEffect, useState } from "react";
import cartService from "../services/cartService";

const CartPage = () => {
    const [cart, setCart] = useState(null);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (userId) {
            cartService.getCart(userId).then(setCart).catch(console.error);
        }
    }, [userId]);

    const handleUpdateQuantity = (itemId, quantity) => {
        cartService.updateCartItem(itemId, quantity).then(() => {
            setCart((prevCart) => ({
                ...prevCart,
                cartItems: prevCart.cartItems.map(item =>
                    item.id === itemId ? { ...item, quantity } : item
                )
            }));
        });
    };

    const handleRemoveItem = (itemId) => {
        cartService.removeCartItem(itemId).then(() => {
            setCart((prevCart) => ({
                ...prevCart,
                cartItems: prevCart.cartItems.filter(item => item.id !== itemId)
            }));
        });
    };

    if (!cart) return <p>Loading cart...</p>;

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cart.cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cart.cartItems.map((item) => (
                        <li key={item.id}>
                            {item.book.title} - {item.quantity}
                            <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                            <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CartPage;
