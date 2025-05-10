import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import './LoginSignUp.css';

const LoginSignUp = ({setIsAuthenticated}) => {
    const [isLogin, setIsLogin] = useState(true); // To toggle between Login and Sign Up
    const [formData, setFormData] = useState({
        name: '', // Only for sign up
        username: '', // Only for sign up
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [agree, setAgree] = useState(false); // For the checkbox

    const navigate = useNavigate();

    const { name, username, email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Clear error on new input
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!isLogin && !agree) {
            setError("You must agree to the terms to sign up.");
            setLoading(false);
            return;
        }

        const url = isLogin ? '/api/user/login' : '/api/user/register';
        const body = isLogin ? { email, password } : { name, username, email, password };

        try {
            // IMPORTANT: Replace 'http://localhost:5000' with your actual backend URL
            // You might want to use an environment variable for this in a real app
            const response = await fetch(`http://localhost:5000${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            setLoading(false);

            if (!response.ok) {
                // data.message is what we sent from the backend
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            // Successful login or registration
            console.log(isLogin ? 'Login successful:' : 'Registration successful:', data);

            if (data.token) {
                // Store the token (e.g., in localStorage)
                localStorage.setItem('token', data.token);
                //set the state authentication variable to true
                setIsAuthenticated(true);
                // You might want to store user info in context or Redux
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
                // Redirect to home page or dashboard
                navigate('/'); // Or to a protected route like '/dashboard'
            } else {
                // Should not happen if backend sends token on success
                setError(isLogin ? 'Login failed. Please try again.' : 'Registration failed. Please try again.');
            }

        } catch (err) {
            setLoading(false);
            setError(err.message || (isLogin ? 'Login failed. Please try again.' : 'Registration failed. Please try again.'));
            console.error('API call failed:', err);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError('');
        setFormData({ name: '', username: '', email: '', password: '' }); // Reset form
    };

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="loginsignup-fields">
                        {!isLogin && (
                            <>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={onChange}
                                    required={!isLogin}
                                />
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={onChange}
                                    required={!isLogin}
                                />
                            </>
                        )}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={onChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={onChange}
                            required
                            minLength={isLogin ? undefined : 6} // Enforce minLength for signup only on frontend
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Processing...' : (isLogin ? 'Login' : 'Continue')}
                    </button>
                </form>
                {isLogin ? (
                    <p className="loginsignup-toggle">
                        Don't have an account? <span onClick={toggleForm}>Sign Up Here</span>
                    </p>
                ) : (
                    <p className="loginsignup-toggle">
                        Already have an account? <span onClick={toggleForm}>Login Here</span>
                    </p>
                )}
                {!isLogin && (
                    <div className="loginsignup-agree">
                        <input
                            type="checkbox"
                            name="agree"
                            id="agree"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                        />
                        <label htmlFor="agree">By continuing, I agree to the terms of use & dabloons</label>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginSignUp;