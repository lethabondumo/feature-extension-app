import React, { useState, useEffect, useHistory } from 'react';

function AllocationForm({ bookingId }) {
  const [cleaners, setCleaners] = useState([]);
  const [selectedCleanerId, setSelectedCleanerId] = useState('');
  const history = useHistory(); 

  useEffect(() => {
    fetchCleaners();
  }, []);

  const fetchCleaners = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/cleaners");
      if (response.ok) {
        const data = await response.json();
        setCleaners(data);
      } else {
        throw new Error("Failed to fetch cleaners");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch cleaners. Please try again later.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!bookingId) {
        throw new Error("Booking ID is not provided");
      }
      const response = await fetch(`http://localhost:5001/api/allocations/${bookingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cleanerId: selectedCleanerId })
      });
      if (response.ok) {
        alert("Allocation successful");
        history.push('/api/allocations');
      } else {
        throw new Error("Failed to allocate cleaner to booking");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to allocate cleaner to booking. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Allocate Cleaner to Booking</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cleaner">Select Cleaner:</label>
        <select id="cleaner" value={selectedCleanerId} onChange={(e) => setSelectedCleanerId(e.target.value)}>
          <option value="">Select</option>
          {cleaners.map(cleaner => (
            <option key={cleaner.id} value={cleaner.id}>{`${cleaner.firstname} ${cleaner.lastname}`}</option>
          ))}
        </select>
        <button type="submit">Allocate</button>
      </form>
    </div>
  );
}

export default AllocationForm;
