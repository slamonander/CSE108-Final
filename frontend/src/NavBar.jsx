import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {
    const [balance, setBalance] = useState(null)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.balance != null) {
            setBalance(user.balance);
        }
    }, [isAuthenticated]);

    const handleLogout = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        window.location.href = '/login';
    };
    return (
        <nav className="navBar">
            <img src="https://media.forgecdn.net/avatars/thumbnails/265/180/256/256/637228616324135331.png" className="logoImg"></img><div className="logo">Dabloons</div>
            <ul className="navLinks">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Items</Link></li>
                <li><Link to="/cart">Basket</Link></li>
                {isAuthenticated && balance != null && (
                    <li className="balance">💰 {balance} dabloons</li>
                )}
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                {isAuthenticated ? <li><button className="logoutBtn" onClick={handleLogout}>Log out</button></li> : <li><Link to="/login">Login</Link></li> }
            </ul>
        </nav>
    );
};

export default NavBar;