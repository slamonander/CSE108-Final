import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./ProductList.css";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const baseUrl = "https://cse108-final.onrender.com";

const ProductList = () => {
    const [cart, setCart] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

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
            setSnackbarMessage(`${product.name} added to cart!`);
            setSnackbarOpen(true);
        } catch (err) {
          setError(
            err.response?.data?.error || err.message ||
              "Could not add item to cart. Please try again."
          );
        }
    };
    
    const sortProducts = (products, option) => {
        const sorted = [...products];
        switch (option) {
            case 'price':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'reviews':
                sorted.sort((a, b) => b.ratingCount - a.ratingCount);
                break;
            case 'average':
                const avg = p => p.ratingCount > 0 ? p.ratingTotal / p.ratingCount : 0;
                sorted.sort((a, b) => avg(b) - avg(a));
                break;
            default:
                break;
        }
        return sorted;
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

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbarOpen(false);
      };


    return (
        <>
        <div className="sortContainer">
                <label htmlFor="sort">Sort by: </label>
                <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="">Default</option>
                    <option value="price">Price (Low to High)</option>
                    <option value="reviews">Number of Reviews</option>
                    <option value="average">Average Rating</option>
                </select>
            </div>

        <div className="productGrid">
            {sortProducts(products, sortOption).map(product => (
                <div className="productCard" key={product._id}>
                    <Link to={`/products/${product._id}`}>
                        <img src={product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                    </Link>
                    <p>{product.price}</p>
                    <Box sx={{ alignItems: 'center', mb: 0 }}>
                        <Rating
                            name={`product-rating-${product._id}`}
                            value={product.ratingCount > 0 ? product.ratingTotal / product.ratingCount : 0}
                            precision={0.5}
                            readOnly
                        />
                    </Box>
                    <Box sx={{ ml: 0, mb:3 }}>
                        {product.ratingCount > 0
                        ? `${(product.ratingTotal / product.ratingCount).toFixed(1)} (${product.ratingCount} review${product.ratingCount > 1 ? 's' : ''})`
                        : 'No ratings yet'}
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
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
            <MuiAlert onClose={handleSnackbarClose} severity={error ? "error" : "success"} elevation={6} variant="filled">
                {snackbarMessage}
            </MuiAlert>
        </Snackbar>
        </>
    );
};

export default ProductList;
