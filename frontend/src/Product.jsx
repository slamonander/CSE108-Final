import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Product.css";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
const baseUrl = "https://cse108-final.onrender.com";

const Product = () => {
    const [cart, setCart] = useState(null);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userRatings, setUserRatings] = useState(0);

    const handleSubmitRating = async (productId) => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;
      
        try {
          await axios.post(
            `${baseUrl}/api/products/${productId}/rate`,
            { rating: userRatings },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert("Rating submitted!");
        } catch (err) {
          alert("Could not submit rating: " + err.message);
        }
      };

    useEffect(() => {
        axios.get(`${baseUrl}/api/products/${id}`)
            .then(response => {
                setProduct(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error retrieving product", error);
                setError("Failed to load product.");
                setLoading(false);
            });
    }, [id]);
    
    if (loading) {
        return <div className="text">Loading product. Spare us a moment.</div>
    }

    if (error) {
        return <div className="text">{error}</div>
    }

    const handleCartChange = async (product) => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;
      
        try {
          // product should be an object: { productId, name, quantity, price }
          const res = await axios.post(
            `${baseUrl}/api/cart/${userId}/items`,
            product,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setCart(res.data); // Update cart state with new data from backend
        } catch (err) {
          setError(
            err.response?.data?.error || err.message ||
              "Could not add item to cart. Please try again."
          );
        }
      };

    return (
        <div className="productInfo">
            <div className="productImg">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="details">
                <h2 className="productName">{product.name}</h2>
                <p className="price">{product.price} dabloons</p>
                <br />
                <h3 className="itemDescription">item's description:</h3>
                <p>{product.description}</p>
                <p>Category: {product.category}</p>
                <p>Stock: {product.quantity}</p>
                <button onClick={() =>
                    handleCartChange({
                        productId: product._id,
                        name: product.name,
                        quantity: 1,
                        price: product.price,
                    })}>Add to Cart
                </button>
                <Box sx={{ alignItems: 'center', mb: 1, mt: 4 }}>
                    <Rating
                        name="user-rating"
                        value={userRatings}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setUserRatings(newValue);
                        }}
                    />
                    <Box sx={{ ml: 0 }}>{userRatings !== null && userRatings !== 0 ? userRatings : 'click stars to rate'}</Box>
                </Box>
                <button onClick={() => handleSubmitRating(product._id)} disabled={!userRatings}>
                Submit Rating
                </button>
            </div>
        </div>
    );
};

export default Product;