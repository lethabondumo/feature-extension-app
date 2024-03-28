import React, { useState, useEffect } from 'react';

function AllocationList() {
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    fetchAllocations();
  }, []);

  const fetchAllocations = async () => {
    try {
      let response = await fetch("http://localhost:5001/api/allocations");
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setAllocations(data);
      } else {
        throw new Error("Failed to fetch allocations");
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
      let response = await fetch(`http://localhost:5001/api/allocations/${id}`, options);
      if (response.ok) {
        fetchAllocations();
      } else {
        throw new Error("Failed to delete allocation");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
    <h2>Bookings List</h2>
    {allocations.length === 0 ? (
      <div>No allocations data available</div>
    ) : (
      <table>
        <thead>
          <tr>
            <th>Allocation ID</th>
            <th>Booking ID</th>
            <th>Cleaner</th>
          </tr>
        </thead>
        <tbody>
          {allocations.map(allocation => (
            <tr key={allocation.id}>
              <td>{allocation.id}</td>
              <td>{allocation.booking_id}</td>
              <td>{`${allocation.cleaner.firstname} ${allocation.cleaner.lastname}`}</td>
              <td>
                  <button onClick={() => handleDelete(allocation.id)}>Remove</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    </div>
  );
}

export default AllocationList;
