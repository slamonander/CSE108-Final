import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDabloonsBalance } from './api';  // Import the API function
import "./NavBar.css";

const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {
    const [dabloons, setDabloons] = useState(0);

    useEffect(() => {
        if (isAuthenticated) {
            const token = localStorage.getItem('token');
            getDabloonsBalance(token)
                .then(response => setDabloons(response.balance))
                .catch(error => console.error('Error fetching dabloons:', error));
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        window.location.href = '/login';
    };

    return (
        <nav className="navBar">
            <img src="https://media.forgecdn.net/avatars/thumbnails/265/180/256/256/637228616324135331.png" className="logoImg" alt="Logo" />
            <div className="logo">Dabloons</div>
            <ul className="navLinks">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                {isAuthenticated ? (
                    <>
                        <li><span className="dabloons">Dabloons: {dabloons}</span></li> {/* Display the balance */}
                        <li><button className="logoutBtn" onClick={handleLogout}>Log out</button></li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;