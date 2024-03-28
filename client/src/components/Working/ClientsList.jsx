import React, { useState, useEffect } from 'react';

function ClientsList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/clients");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setClients(data);
      } else {
        throw new Error("Failed to fetch clients");
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
      let response = await fetch(`http://localhost:5001/api/clients/${id}`, options);
      if (response.ok) {
        fetchClients();
      } else {
        throw new Error("Failed to delete client");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Clients List</h2>
      {clients.length === 0 ? (
        <div>No clients data available</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{`${client.firstname} ${client.lastname}`}</td>
                <td>{client.email}</td>
                <td>{client.phone_number}</td>
                <td>
                <button onClick={() => handleDelete(client.id)}>Remove</button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClientsList;
