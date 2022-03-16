import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../SignupPage/AuthForms.css'

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
    <div className='main'>
      <p class="sign" align="center">Sign in</p>
 
      <form onSubmit={handleSubmit} className="form1">

        <input 
          type="text"
          name="name"
          value={username}
          onChange={handleUsername}
          className="un"
          placeholder='Username'
          
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
        >Sign Up</button>

      </form>

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  )
}

export default SignupPage;