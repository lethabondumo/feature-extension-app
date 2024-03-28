import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}><Link to="/" style={linkStyle}>Home</Link></li>
        <li style={liStyle}><Link to="/booking-form" style={linkStyle}>Add Booking</Link></li>
        <li style={liStyle}><Link to="/bookings-list" style={linkStyle}>View Bookings</Link></li> 
        <li style={liStyle}><Link to="/cleaner-form" style={linkStyle}>Add Cleaner</Link></li>
        <li style={liStyle}><Link to="/cleaners-list" style={linkStyle}>View Cleaners</Link></li>
      </ul>
    </nav>
  );
}

const navStyle = {
  backgroundColor: "#7ABD79",
  color: "#fff",
  padding: "10px 20px",
  textAlign: "center",
};

const ulStyle = {
  listStyleType: "none",
  margin: 0,
  padding: 0,
};

const liStyle = {
  display: "inline",
  margin: "0 10px",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};

export default NavBar;
