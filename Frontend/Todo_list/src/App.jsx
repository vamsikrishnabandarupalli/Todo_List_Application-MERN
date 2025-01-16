import { useState, useEffect } from "react";
import About from "./components/About/About";
import Home from "./components/home/Home";
import SignIn from "./components/login/SignIn";
import Navigationbar from "./components/Navbar/Navbar";
import SignUp from "./components/Register/SignUp";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Todo from "./components/todo/todo";

function App() {
  // Initializing login state from localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(
      () => localStorage.getItem("isLoggedIn") === "true"
    );
    const [username, setUsername] = useState(() => localStorage.getItem("username"));
  
    useEffect(() => {
      localStorage.setItem("isLoggedIn", isLoggedIn);
    }, [isLoggedIn]);
  
    const handleLogout = () => {
      setIsLoggedIn(false);
      localStorage.removeItem("userId");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
    };
  
    return (
      <div id="app">
        <Router>
          <Navigationbar
            isLoggedIn={isLoggedIn}
            username={username}
            onLogout={handleLogout}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/todo"
              element={
                isLoggedIn ? <Todo /> : <Navigate to="/signin" replace />
              }
            />
            <Route
              path="/signin"
              element={<SignIn setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />}
            />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </div>
    );
  }
  
export default App;