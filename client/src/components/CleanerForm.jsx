import React, { useState } from "react";

function CleanerForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    date_of_birth: "",
    email: "",
    phone_country: "",
    phone_number: "",
    hourly_rate: "",
    usual_availability: ""
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  
  const addCleaner = async () => {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    };

    try {
      let response = await fetch("http://localhost:5001/api/cleaners", options);
      if (response.ok) {
          let data = await response.json();
          console.log("New cleaner added:", data);
          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            date_of_birth: "",
            phone_country: "",
            phone_number: "",
            hourly_rate: "",
            usual_availability: ""
          });
          alert("Cleaner added successfully!");
        } else {
          throw new Error("Failed to add cleaner");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while adding the cleaner.");
      }
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      firstname,
      lastname,
      date_of_birth,
      email,
      phone_country,
      phone_number,
      hourly_rate,
      usual_availability
    } = formData;
    
    // Check if all required fields are filled
    if (
      firstname &&
      lastname &&
      date_of_birth &&
      email &&
      phone_country &&
      phone_number &&
      hourly_rate &&
      usual_availability
      ) {

      // Check if phone number length does not exceed 25 characters
      if (phone_number.length > 25) {
        alert("Phone number should not exceed 25 characters.");
        return;
      }

      // Check if hourly rate has exactly two decimal places
      if (parseFloat(hourly_rate).toFixed(2) !== hourly_rate) {
        alert("Hourly rate must have exactly two decimal places.");
        return;
      }
      // Add cleaner if all conditions are met
      addCleaner();
  } else {
    alert("Please fill in all fields.");
  }
};

  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          fontFamily: "Arial, sans-serif",
          fontSize: "24px",
        }}
      >
        Add New Cleaners With The Form Below:
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">First Name:</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="Enter first name"
          value={formData.firstname}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Enter last name"
          value={formData.lastname}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <label htmlFor="lastname">Date Of Birth:</label>
        <input
          type="text"
          id="date_of_birth"
          name="date_of_birth"
          placeholder="Enter date of birth (e.g., 2000-02-20)"
          value={formData.date_of_birth}
          onChange={handleChange}
          style={{ ...inputStyle, fontFamily: "Arial, sans-serif", fontSize: "16px" }}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <label htmlFor="phone_country">Country Extension:</label>
        <select
          name="phone_country"
          value={formData.phone_country}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">Select Country Extension</option>
          <option value="+49 0211">+49 0211 (Standard German local number)</option>
          <option value="0800">0800 (Standard German toll-free number)</option>
          <option value="+49 032">+49 032 (Standard German national number)</option>
        </select>
        <label htmlFor="phone_number">Phone Number:</label>
        <input
          type="text"
          id="phone_number"
          name="phone_number"
          placeholder="Enter phone number"
          value={formData.phone_number}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <label htmlFor="hourly_rate">Hourly Rate (Euro Value):</label>
        <input
          type="number"
          id="hourly_rate"
          name="hourly_rate"
          placeholder="Enter hourly rate rounded to two decimal places (i.e., 30.00)"
          value={formData.hourly_rate}
          onChange={handleChange}
          style={inputStyle}
          required
        />
          <label htmlFor="usual_availability">Preferred Working Times:</label>
          <textarea
            id="usual_availability"
            name="usual_availability"
            placeholder="Enter detailed description of your usual availability/preferred working hours so booking allocations can meet your schedule needs where possible (e.g., Mondays - Thursdays: Unavailable; Fridays: 14:00 - 17:00; Saturdays: 08:00 - 16:00; Sundays: Unavailable)"
            value={formData.usual_availability}
            onChange={handleChange}
            style={{ ...inputStyle, fontFamily: "Arial, sans-serif", fontSize: "16px" }}
            required
          />
        <button type="submit" style={buttonStyle}>Submit</button>
    </form>
  </div>
);
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "20px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  backgroundColor: "#333",
  color: "#fff",
  padding: "10px",
  borderRadius: "5px",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

export default CleanerForm;

