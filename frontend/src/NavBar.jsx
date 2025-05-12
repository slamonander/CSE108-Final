import React, { useState }  from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);
    
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
                {isAuthenticated ? (
                    <>
                        <li className="avatar">
                            <img src={user?.image || "https://64.media.tumblr.com/99e1a6e7924dd08f53a863840c6db23a/ddc47f5445fb968a-66/s500x750/8880abcb41ecb93cd8c9ddd109cb3ea6afe30783.gifv"}
                            alt="User"
                            className="avatarImg"/>
                        </li>
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