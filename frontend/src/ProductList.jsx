import React from "react";
import "./ProductList.css";

const products = [
    {
        id: 1,
        item: "Product 1",
        price: "$10.00",
        image: "https://preview.redd.it/dabloons-cat-v0-1nujqh9wdlwc1.jpeg?auto=webp&s=7d0ebd2a743325280abc8a5f1c727cc7283ac945",
    },
    {
        id: 2,
        item: "Product 2",
        price: "$10.00",
        image: "https://preview.redd.it/dabloons-cat-v0-1nujqh9wdlwc1.jpeg?auto=webp&s=7d0ebd2a743325280abc8a5f1c727cc7283ac945",
    },
    {
        id: 3,
        item: "Product 3",
        price: "$10.00",
        image: "https://preview.redd.it/dabloons-cat-v0-1nujqh9wdlwc1.jpeg?auto=webp&s=7d0ebd2a743325280abc8a5f1c727cc7283ac945",
    },
];

const ProductList = () => {
    return (
        <div className="productGrid">
            {products.map(product => (
                <div className="productCard" key={product.id}>
                    <img src={product.image} alt={product.item} />
                    <h2>{product.item}</h2>
                    <p>{product.price}</p>
                    <button>Add to cart</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
