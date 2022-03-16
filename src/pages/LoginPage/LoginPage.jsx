import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import '../SignupPage/AuthForms.css'

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const navigate = useNavigate();
  
    const handlePassword = (e) => setPassword(e.target.value);
    const handleUsername = (e) => setUsername(e.target.value);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const body = { username, password };

      axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, body)
      .then((response) => {
        console.log('res.data', response.data);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/home');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="main">
      <p class="sign" align="center">Login</p>
      <form onSubmit={handleSubmit} className="form1">
        <input 
        type="text" 
        name="username" 
        value={username} 
        onChange={handleUsername} 
        className="un"
        placeholder="Username"
        />

        <input 
        type="password"
        name="password" 
        value={password} 
        onChange={handlePassword} 
        className="pass"
        placeholder="Password"
        />

        <button 
        type="submit"
        className="submit" 
        >Login</button>
      </form>
    </div>
  );
}

export default LoginPage;