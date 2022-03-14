import '../Navbar/Navbar.css'
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";                     



function Navbar() {



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
      <a href="#" className="nav__brand">
        Better Me
      </a>


      <ul className={active}>
        <li className="nav__item">
        {/*   <a href="#" className="nav__link">Home</a> */}
          <Link to="/home">Home Page</Link>
        </li>
        <li className="nav__item">
          <Link to="/new-goal">New goal</Link>
        </li>
        <li className="nav__item">
          <Link to="/signup">Sign Up</Link>
        </li>
        <li className="nav__item">
          <Link to="/login">Login</Link>
        </li>
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