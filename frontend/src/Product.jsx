import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Product.css";

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
                <button>Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;