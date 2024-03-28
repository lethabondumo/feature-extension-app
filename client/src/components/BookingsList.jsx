import React, { useState, useEffect } from "react";

function BookingsList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/bookings");
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setBookings(data);
      } else {
        throw new Error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching bookings.");
    }
  };

  const handleDelete = async (id) => {
    let options = {
      method: "DELETE",
    };
    try {
      let response = await fetch(`http://localhost:5001/api/bookings/${id}`, options);
      if (response.ok) {
        fetchBookings();
      } else {
        throw new Error("Failed to delete booking");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 style={headingStyle}>List Of Bookings</h2>
      {bookings.length === 0 ? (
        <div>No bookings data available</div>
      ) : (
        <>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Booking Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Phone Number</th>
                <th>Area</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td style={smallColumnStyle}>{booking.id}</td>
                  <td>{booking.firstname}</td>
                  <td>{booking.lastname}</td>
                  <td>{booking.booking_date}</td>
                  <td>{booking.start_time}</td>
                  <td>{booking.end_time}</td>
                  <td>{booking.phone_number}</td>
                  <td>{booking.area}</td>
                  <td>
                    <button style={buttonStyle} onClick={() => handleDelete(booking.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Building Type</th>
                <th>Street Number</th>
                <th>Street Name</th>
                <th>Apartment Building Name</th>
                <th>Apartment Number</th>
                <th>Complex Name</th>
                <th>Unit Number</th>
                <th>Other Address Description</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td style={smallColumnStyle}>{booking.id}</td>
                  <td>{booking.building_type}</td>
                  <td style={smallColumnStyle}>{booking.street_number}</td>
                  <td>{booking.street_name}</td>
                  <td>{booking.apartment_building_name || "N/A"}</td>
                  <td style={smallColumnStyle}>{booking.apartment_number || "N/A"}</td>
                  <td>{booking.complex_name || "N/A"}</td>
                  <td style={smallColumnStyle}>{booking.unit_number || "N/A"}</td>
                  <td>{booking.other_address_description || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

const headingStyle = {
  fontWeight: "bold",
  textAlign: "center",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "70px",
  textAlign: "justify",

};

const smallColumnStyle = {
  width: "50px",
  textAlign: "center",
};

const buttonStyle = {
  backgroundColor: "#f44336",
  color: "#fff",
  border: "none",
  padding: "8px 16px",
  borderRadius: "4px",
  cursor: "pointer",
};

export default BookingsList;