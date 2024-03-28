import React, { useState, useEffect } from "react";

function CleanerList() {
  const [cleaners, setCleaners] = useState([]);

  useEffect(() => {
    fetchCleaners();
  }, []);

  const fetchCleaners = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/cleaners");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCleaners(data);
      } else {
        throw new Error("Failed to fetch cleaners");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    let options = {
      method: "DELETE",
    };
    try {
      let response = await fetch(`http://localhost:5001/api/cleaners/${id}`, options);
      if (response.ok) {
        // After successful deletion, fetch updated list of cleaners
        fetchCleaners();
      } else {
        throw new Error("Failed to delete cleaner");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Active Cleaners List</h2>
      {cleaners.length === 0 ? (
        <div>No cleaning data available</div>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Cleaner ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Phone Country</th>
              <th>Phone Number</th>
              <th>Hourly Rate</th>
              <th>Usual Availability</th>
              <th style={action}>Action</th>
            </tr>
          </thead>
          <tbody>
            {cleaners.map((cleaner) => (
              <tr key={cleaner.id}>
                <td>{cleaner.id}</td>
                <td>{cleaner.firstname}</td>
                <td>{cleaner.lastname}</td>
                <td>{cleaner.date_of_birth}</td>
                <td>{cleaner.email}</td>
                <td>{cleaner.phone_country}</td>
                <td>{cleaner.phone_number}</td>
                <td>{cleaner.hourly_rate}</td>
                <td>{cleaner.usual_availability}</td>
                <td>
                  <button style={buttonStyle} onClick={() => handleDelete(cleaner.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const containerStyle = {
  textAlign: "center",
  margin: "20px auto",
};

const action = {
  textAlign: "center",
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

const buttonStyle = {
  backgroundColor: "#f44336",
  color: "#fff",
  border: "none",
  padding: "8px 16px",
  borderRadius: "4px",
  cursor: "pointer",
};

export default CleanerList;