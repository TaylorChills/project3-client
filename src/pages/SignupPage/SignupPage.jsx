import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../SignupPage/AuthForms.css'

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [imageUrl, setImageUrl] = useState('')

  const navigate = useNavigate();

  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);


  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Cloudinary
    /* const uploadData = new FormData();
    uploadData.append("file", imageUrl);

    const upload = await axios.post(`${process.env.REACT_APP_API_URL}/upload`,uploadData, { headers: { Authorization: `Bearer ${storedToken}` } }
    );

    , imageUrl: upload.data.fileUrl */


    const body = { username, password };

    //cloudinary

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, body)
      .then((response) => {
        navigate('/login');
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className='main'>
      <p class="sign" align="center">Sign Up</p>
 
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

        <br />

      {/*   <label>Image:</label>
        <input type="file" name="imageUrl" accept="image/jpeg" onChange={(e) => setImageUrl(e.target.files[0])}/> */}

        <button 
        type="submit" 
        className="submit" 
        >Sign Up</button>

        

      </form>

      <p>Already have account?</p>
      <Link to={"/login"} className="login-link">Login</Link>
    </div>
  )
}

export default SignupPage;