import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Routes";
import Routes from "./components/Header";
import { useNavigate } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const COHORT_NAME = "2302-acc-pt-web-pt-b";
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const token = sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/home");
  };

  useEffect(() => {
    // Check if there is a token 
    const token = sessionStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      sessionStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  }, [token]); // Empty dependency array 

  const makeHeaders = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />

      <Routes />
    </>
  );
}

export default App;