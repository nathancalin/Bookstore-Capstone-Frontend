import React, { useEffect, useState } from "react";
import orderService from "../services/orderService";
import "../styles/global.css";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        orderService.getOrders()
            .then(setOrders)
            .catch(error => console.error("Error fetching orders:", error));
    }, []);

    return (
        <div className="container">
            <h2>Order History</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul>
                    {orders.map(order => (
                        <li key={order.id} className="order-card">
                            <h3>Order ID: {order.id}</h3>
                            <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                            <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
                            <h4>Ordered Books:</h4>
                            <ul className="book-list">
                                {order.orderItems.map(item => (
                                    <li key={item.id} className="book-card">
                                        <h4>{item.book.title}</h4>
                                        <p><strong>Author:</strong> {item.book.author}</p>
                                        <p><strong>Quantity:</strong> {item.quantity}</p>
                                        <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                                        <p><strong>Description:</strong> {item.book.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrdersPage;
