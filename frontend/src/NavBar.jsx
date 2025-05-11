import React, { useState }  from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {
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
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                {isAuthenticated ? <li><button className="logoutBtn" onClick={handleLogout}>Log out</button></li> : <li><Link to="/login">Login</Link></li> }
            </ul>
        </nav>
    );
};

export default NavBar;