import '../Navbar/Navbar.css'
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/auth.context';                  



function Navbar() {

  const { loggedIn, user, logoutUser } = useContext(AuthContext);

  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };


  
  return (
    <nav className="nav">
      {/* <a href="#" className="nav__brand">
        Better Me
      </a> */}

      <h1 className="nav__brand">Better Me</h1>


      <ul className={active}>
        {loggedIn && (
          <>
            <li>
              <Link to="/home" className="nav__item">Home Page</Link>
            </li>

            <li>
              <Link to="/new-goal" className="nav__item">New goal</Link>
            </li>

            <li>
              <button onClick={logoutUser} className="nav__button">Logout</button>
            </li>
          </>
        )}
        {!loggedIn && (
          <>
            <li>
              <Link to="/signup" className="nav__item">Sign Up</Link>
            </li>

            <li>
              <Link to="/login" className="nav__item">Login</Link>
            </li>
          </>
          )}
      </ul>

      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>

    </nav>
  );
}

export default Navbar;