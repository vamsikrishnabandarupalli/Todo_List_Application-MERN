import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import PropTypes from 'prop-types';
import './SignIn.css'

export default function SignIn({ setIsLoggedIn, setUsername }) {
  const [formData, setformData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auths/login", formData);
      const { userId, username } = response.data;
      // Update state and localStorage
      setIsLoggedIn(true);
      setUsername(username);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("isLoggedIn", "true");

      setMessage("Login successful!");
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed!");
      console.log(error.response?.data || error); 
    }
  };


  

  SignIn.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
  };

  return (
    <div className="container-fluid" id="one">
      <div id="login">
        <div id="left">
            <div id="register">
                <h4>Hello, User</h4>
                <p>Enter your details to register for using site features</p>
                <button type="button">
                    <Link to="/signup">Register Here</Link>
                </button>
            </div>
        </div>
          <form method="post" onSubmit={handleSubmit}>
            <h3>Login</h3>
            {message && <p className="text-dark">{message}</p>}
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary px-3 py-2 border-2 border-white rounded-3 w-100"
            >
              Login
            </button>
          </form>
          <div id="registerform">
              <p className="text-dark">New user?</p>
              <button type="button">
                  <Link to="/signup">Register Here</Link>
              </button>
          </div>
      </div>
    </div>
  );
}
