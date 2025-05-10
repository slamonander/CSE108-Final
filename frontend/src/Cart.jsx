import React, { useEffect, useState }  from "react";
import "./Cart.css";
import axios from "axios";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    let userId = null;
  
    useEffect(() => {
        const token = localStorage.getItem("token");
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            userId = user.id;
        } catch (error) {
            userId = null;
        }

        if (!userId || !token) {
            setError("You must be logged in to view your cart.");
            setLoading(false);
            return;
        }

      
      axios
      .get(`http://localhost:5000/api/cart/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            setCart(res.data);
            setLoading(false);
        })
        .catch((err) => {
          setError(
            err.response?.data?.message || "Could not fetch cart. Please try again."
          );
          setLoading(false);
        });
    }, []);
  
    if (loading) return <div className="text">Loading your cart...</div>;
    if (error) return <div className="text">{error}</div>;
    if (!cart || cart.items.length === 0)
      return (
        <div className="text">
          <p>Your basket seems a little empty, traveler.</p>
        </div>
      );
  
    return (
      <div className="cart-container">
        <h2>Your Cart</h2>
        <ul className="cart-items">
          {cart.items.map((item) => (
            <li key={item.productId} className="cart-item">
              <span className="item-name">{item.name}</span>
              <span className="item-qty"> (x{item.quantity}) </span>
              <span className="item-price">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <strong>Total:</strong> ${cart.total.toFixed(2)}
        </div>
      </div>
    );
  };
  

export default Cart;