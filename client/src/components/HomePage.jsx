import React from "react";
import sunshineImage from "./Sunshine.jpeg";

function HomePage() {
  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Welcome to Sunshine Cleaning</h2>
      <img src={sunshineImage} alt="Sunshine Cleaning" style={imageStyle} />
      <div style={contentStyle}>
      <p style={paragraphStyle}>
          Welcome to Sunshine Cleaning, your trusted partner for all your cleaning needs in Berlin.
          We take pride in delivering top-notch cleaning services to residential and commercial clients alike.
        </p>
        <p style={paragraphStyle}>
          At Sunshine Cleaning, we understand that a clean environment is essential for your well-being and productivity.
          That is why we go above and beyond to ensure that every corner of your space is spotless and hygienic.
          From regular maintenance cleaning to deep cleaning and sanitization, we"ve got the expertise and dedication to exceed your expectations.
        </p>
      </div>
    </div>
  );
}

const containerStyle = {
  textAlign: "center",
  marginTop: "50px",
};

const imageStyle = {
  maxWidth: "100%",
  maxHeight: "300px",
  marginBottom: "20px",
};

const contentStyle = {
  textAlign: "center",
};

const headingStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const paragraphStyle = {
  fontSize: "18px",
  lineHeight: "1.6",
  textAlign: "justify",
  maxWidth: "800px",
  margin: "0 auto",
};

export default HomePage;
