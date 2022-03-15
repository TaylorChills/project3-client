import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { username, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, body)
      .then((response) => {
        navigate('/login');
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>
 
      <form onSubmit={handleSubmit}>
      <label>Username:</label>    <br />
        <input 
          type="text"
          name="name"
          value={username}
          onChange={handleUsername}
        />
        <br />
 
        <label>Password:</label>    <br />
        <input 
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <br />

        <button type="submit">Sign Up</button>
      </form>

      <br />
 
      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  )
}

export default SignupPage;