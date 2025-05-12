import React, { useEffect, useState }  from "react";
import "./Cart.css";
import axios from "axios";
const baseUrl = "https://cse108-final.onrender.com";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    let userId = null;
  
    useEffect(() => {
        const token = localStorage.getItem("token");
        let userId = null;
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
          .get(`${baseUrl}/api/cart/${userId}`, {
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
/*     
      if (!cart || !Array.isArray(cart.items)) // this is now in the errors above
      return (
        <div className="text">
          <p> cart.items is undefined.</p>
        </div>
      ); 
 */    
      if (!cart || cart.items.length === 0)
      return (
        <div className="text">
          <p>Your basket seems a little empty, traveler.</p>
        </div>
      );
    
    const handleQuantityChange = async (productId, newQuantity) => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;
        if (newQuantity < 0) return;
        else if(newQuantity == 0){
            try {
                const res = await axios.delete(
                    `${baseUrl}/api/cart/${userId}/items/${productId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setCart(res.data);
              } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Could not remove item from cart."
                );
              }
              return;
        }
        
        
        try {
            const res = await axios.put(
            `${baseUrl}/api/cart/${userId}/items/${productId}`,
            { quantity: newQuantity },
            { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(res.data); // Update cart state with new data from backend
        } catch (err) {
            setError(
            err?.message ||
                "Could not update cart. Please try again."
            );
        }
    };

    const handlePurchase = async () => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;
      
        if (!userId || !token) {
          setError("You must be logged in to make a purchase.");
          return;
        }
      
        try {
          setLoading(true);
          const res = await axios.post(
            `${baseUrl}/api/cart/${userId}/purchase`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setLoading(false);
          setCart({ items: [], total: 0 }); // Clear cart on purchase
          alert("Purchase successful! Thank you for shopping.");
        } catch (err) {
          setLoading(false);
          setError(
            err.response?.data?.message || "Purchase failed. Please try again."
          );
        }
      };
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
            <button onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>+</button>
            <button onClick={() => handleQuantityChange(item.productId, item.quantity - 1)} disabled={item.quantity < 1}>-</button>
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <strong>Total:</strong> ${cart.total.toFixed(2)}
        </div>
        <div className="purchase-button-container">
          <button className="purchase-button"onClick={handlePurchase}>Purchase</button>  
       </div>
      </div>
    );
  };
  

export default Cart;