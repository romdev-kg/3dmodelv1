import React from "react";
import logo from "../assets/4.png"; // Assume the logo is in the `assets` folder

function Header() {
  return (
    <header>
      <div className="container">
        <nav className="navbar">
          <a href="#home" className="logo-link">
            <img src={logo} alt="Logo" className="logo" />
          </a>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#aboutus">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
