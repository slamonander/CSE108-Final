import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./ProductList.css";
import { Link } from "react-router-dom";

// const products = [
//     {
//         id: 1,
//         item: "Product 1",
//         price: "$10.00",
//         image: "https://preview.redd.it/dabloons-cat-v0-1nujqh9wdlwc1.jpeg?auto=webp&s=7d0ebd2a743325280abc8a5f1c727cc7283ac945",
//     },
//     {
//         id: 2,
//         item: "Product 2",
//         price: "$10.00",
//         image: "https://preview.redd.it/dabloons-cat-v0-1nujqh9wdlwc1.jpeg?auto=webp&s=7d0ebd2a743325280abc8a5f1c727cc7283ac945",
//     },
//     {
//         id: 3,
//         item: "Product 3",
//         price: "$10.00",
//         image: "https://preview.redd.it/dabloons-cat-v0-1nujqh9wdlwc1.jpeg?auto=webp&s=7d0ebd2a743325280abc8a5f1c727cc7283ac945",
//     },
// ];

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/products/')
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
                    <button>Add to cart</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
