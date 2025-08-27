import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // 1. UNCOMMENT THIS LINE
import './InputForms.css';

export default function InputForms({ setIsOpen }) {
  // 2. Get the centralized login function from our AuthContext
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const endpoint = isSignUp ? "signUp" : "login";
    try {
      const res = await axios.post(`http://localhost:5050/api/users/${endpoint}`, { email, password });

      // 3. Use the context's login function.
      if (res.data && res.data.user && res.data.token) {
        login(res.data.user, res.data.token);
        setIsOpen(false); // Close the modal on success
      } else {
        setError("Invalid response from server.");
      }

    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-form-container">
      <h2>{isSignUp ? "Create Your Account" : "Welcome Back"}</h2>
      <form className='auth-form' onSubmit={handleOnSubmit}>
        <div className='form-control'>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoFocus
            className='input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-control'>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className='input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className='error-message'>{error}</p>}

        <button type='submit' className="btn-submit">
          {isSignUp ? "Sign Up" : "Login"}
        </button>

        <p className="toggle-auth">
          {isSignUp ? "Already have an account? " : "Don’t have an account? "}
          <span onClick={() => {
            setIsSignUp(prev => !prev);
            setError(""); // Clear errors when toggling form
          }}>
            {isSignUp ? "Login" : "Create one"}
          </span>
        </p>
      </form>
    </div>
  );
}