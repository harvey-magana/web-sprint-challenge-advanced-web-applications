import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState("")
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const logout = () => {
    localStorage.removeItem("token");
  }
  const handleChanges = (e) => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
    })
  }

  const login = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/login", credentials)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
    </>
  );
};

export default Login;
