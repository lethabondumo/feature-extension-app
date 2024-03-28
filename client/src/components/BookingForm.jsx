import React, { useState } from "react";

function BookingForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    booking_date: "",
    start_time: "",
    end_time: "",
    phone_country: "",
    phone_number: "",
    building_type: "",
    street_number: "",
    street_name: "",
    apartment_building_name: "",
    apartment_number: "",
    complex_name: "",
    unit_number: "",
    other_address_description: "",
    area: ""
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const addBooking = async () => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    };

    try {
      let response = await fetch("http://localhost:5001/api/bookings", options);
      if (response.ok) {
        let data = await response.json();
        console.log("New booking added", data);
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          booking_date: "",
          start_time: "",
          end_time: "",
          phone_country: "",
          phone_number: "",
          building_type: "",
          street_number: "",
          street_name: "",
          apartment_building_name: "",
          apartment_number: "",
          complex_name: "",
          unit_number: "",
          other_address_description: "",
          area: ""
        });
        alert("Booking added successfully!");
      } else {
        throw new Error("Failed to add booking");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the booking.");
    }
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      firstname,
      lastname,
      email,
      booking_date,
      start_time,
      end_time,
      phone_country,
      phone_number,
      building_type,
      street_number,
      street_name,
      apartment_building_name,
      apartment_number,
      complex_name,
      unit_number,
      other_address_description,
      area
    } = formData;

    if (
      firstname &&
      lastname &&
      email &&
      booking_date &&
      start_time &&
      end_time &&
      phone_country &&
      phone_number &&
      building_type &&
      street_number &&
      street_name &&
      area
    ) {
      if (!(start_time >= "05:00" && end_time <= "23:59")) {
        alert("Bookings only available for hours between 05:00 and 23:59.");
        return;
      }
      if (end_time < start_time) {
        alert("End time should be greater than start time.");
        return;
      }
      if (phone_number.length > 25) {
        alert("Phone number should not exceed 25 characters.");
        return;
      }
      if (building_type === "Apartment") {
        if (!apartment_building_name || !apartment_number) {
          alert("Please enter apartment building name and number.");
          return;
        }
      } else if (building_type === "Complex") {
        if (!complex_name || !unit_number) {
          alert("Please enter complex name and unit number.");
          return;
        }
      } else if (building_type === "Other") {
        if (!other_address_description) {
          alert("Please enter other address description.");
          return;
        }
      }
      addBooking();
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
        Make Your Booking With The Form Below:
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
        <label htmlFor="date">Booking Date:</label>
        <input
          type="text"
          id="booking_date"
          name="booking_date"
          placeholder="Enter booking date here (e.g., 2024-02-11"
          value={formData.booking_date}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label htmlFor="start_time">Start Time:</label>
        <input
          type="time"
          id="start_time"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          style={{ ...inputStyle, fontFamily: "Arial, sans-serif", fontSize: "16px" }}
          required
        />

        <label htmlFor="end_time">End Time:</label>
        <input
          type="time"
          id="end_time"
          name="end_time"
          value={formData.end_time}
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
        <label htmlFor="building_type">Building Type:</label>
        <select
          name="building_type"
          value={formData.building_type}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">Select Building Type</option>
          <option value="Standalone House">Standalone House</option>
          <option value="Apartment">Apartment</option>
          <option value="Complex">Complex</option>
          <option value="Other">Other</option>
        </select>
      {formData.building_type === "Apartment" && (
        <>
          <label htmlFor="apartment_building_name">Apartment Building Name:</label>
          <input
            type="text"
            id="apartment_building_name"
            name="apartment_building_name"
            placeholder="Enter apartment building name (e.g., Ivy Towers)"
            value={formData.apartment_building_name}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <label htmlFor="apartment_number">Apartment Number:</label>
          <input
            type="text"
            id="apartment_number"
            name="apartment_number"
            placeholder="Enter apartment number (e.g., 3B)"
            value={formData.apartment_number}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </>
      )}
      {formData.building_type === "Complex" && (
        <>
          <label htmlFor="complex_name">Complex Name:</label>
          <input
            type="text"
            id="complex_name"
            name="complex_name"
            placeholder="Enter complex name (e.g., Lakeside Gardens)"
            value={formData.complex_name}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <label htmlFor="unit_number">Unit Number:</label>
          <input
            type="text"
            id="unit_number"
            name="unit_number"
            placeholder="Enter unit number"
            value={formData.unit_number}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </>
      )}
      {formData.building_type === "Other" && (
        <>
          <label htmlFor="other_address_description">Other Address Description:</label>
          <textarea
            id="other_address_description"
            name="other_address_description"
            placeholder="Enter detailed description of address, including building type, block, unit number etc. (e.g., Commercial building: Amazon, Block B, Office 3A; Farm: Fruit Stone...)"
            value={formData.other_address_description}
            onChange={handleChange}
            style={{ ...inputStyle, fontFamily: "Arial, sans-serif", fontSize: "16px" }}
            required
          />
        </>
      )}
        <label htmlFor="street_number">Street Number:</label>
        <input
          type="text"
          id="street_number"
          name="street_number"
          placeholder="Enter street number (e.g., 327)"
          value={formData.street_number}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <label htmlFor="street_name">Street or Road Name:</label>
        <input
          type="text"
          id="street_name"
          name="street_name"
          placeholder="Enter street name (e.g., Park Street)"
          value={formData.street_name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <label htmlFor="area">Area:</label>
      <select
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange}
        style={inputStyle}
        required
      >
        <option value="">Select Area</option>
        <option value="Bernau">Bernau</option>
        <option value="Strausberg">Strausberg</option>
        <option value="Fürstenwalde">Fürstenwalde</option>
        <option value="Königs Wusterhausen">Königs Wusterhausen</option>
        <option value="Ludwigsfelde">Ludwigsfelde</option>
        <option value="Nauen">Nauen</option>
        <option value="Oranienburg">Oranienburg</option>
        <option value="Erkner">Erkner</option>
        <option value="Neuenhagen">Neuenhagen</option>
        <option value="Zossen">Zossen</option>
        <option value="Teltow">Teltow</option>
        <option value="Falkensee">Falkensee</option>
        <option value="Hennigsdorf">Hennigsdorf</option>
        <option value="Wildau and Schönefeld">Wildau and Schönefeld</option>
        <option value="Werder and Beelitz">Werder and Beelitz</option>
      </select>
    
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

export default BookingForm;
