import React from 'react';

function UserView({ addBooking }) {
  return (
    <div>
      <h2>User View</h2>
      <BookingForm onSubmit={addBooking} />
    </div>
  );
}

export default UserView;
