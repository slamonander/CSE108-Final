import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {
    const [balance, setBalance] = useState(null)

    useEffect(() => {
        // Function to update balance from localStorage
        const updateBalance = () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.balance != null) {
                setBalance(user.balance);
            } else {
                setBalance(null);
            }
        };
    
        // Run on mount and when isAuthenticated changes
        updateBalance();
    
        // Listen for the custom "userUpdated" event
        window.addEventListener('userUpdated', updateBalance);
    
        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('userUpdated', updateBalance);
        };
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
                {isAuthenticated ? <li><button className="logoutBtn" onClick={handleLogout}>Log out</button></li> : <li><Link to="/login">Login</Link></li> }
            </ul>
        </nav>
    );
};

export default NavBar;