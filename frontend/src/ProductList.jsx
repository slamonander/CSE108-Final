import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./ProductList.css";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
const baseUrl = "https://cse108-final.onrender.com";

const ProductList = () => {
    const [cart, setCart] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`${baseUrl}/api/products/`)
            .then(response => {
                setProducts(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error getting products:', error);
                setError('Failed to load products');
                setLoading(false);
            });
    }, []);

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

    if (loading) {
        return <div className="text">Loading products. Spare us a moment.</div>
    }

    if (error) {
        return <div className="text">{error}</div>
    }

    if (!products.length) {
        return <div className="text">Apologies. It seems like we are out of inventory.</div>;
    }


    return (
        <div className="productGrid">
            {products.map(product => (
                <div className="productCard" key={product._id}>
                    <Link to={`/products/${product._id}`}>
                        <img src={product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                    </Link>
                    <p>{product.price}</p>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating
                            name={`product-rating-${product._id}`}
                            value={product.ratingCount > 0 ? product.ratingTotal / product.ratingCount : 0}
                            precision={0.5}
                            readOnly
                        />
                        <Box sx={{ ml: 2 }}>
                            {product.ratingCount > 0
                            ? `${(product.ratingTotal / product.ratingCount).toFixed(1)} (${product.ratingCount} review${product.ratingCount > 1 ? 's' : ''})`
                            : 'No ratings yet'}
                        </Box>
                    </Box>
                    <button className="addButton" onClick={() =>
                    handleCartChange({
                        productId: product._id,
                        name: product.name,
                        quantity: 1,
                        price: product.price,
                    })}>Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
