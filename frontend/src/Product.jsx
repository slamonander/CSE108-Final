import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import css later

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/${id}`)
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

    return (
        <div className="productInfo">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Price: {product.price} dabloons</p>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Stock: {product.quantity}</p>
            <button>Add to Cart</button>
        </div>
    );
};

export default Product;