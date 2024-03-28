import React, { useState } from 'react';

function ClientForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: ''
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    // Reset form fields after submission
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phone: ''
    });
  };

  return (
    <div>
      <h2>Add New Client</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} />
        <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ClientForm;
