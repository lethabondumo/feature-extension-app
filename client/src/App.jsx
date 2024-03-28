import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import CleanerForm from "./components/CleanerForm";
import BookingForm from "./components/BookingForm";
import HomePage from "./components/HomePage";
import CleanersList from "./components/CleanersList";
import BookingsList from "./components/BookingsList";
// import ClientsList from "./components/ClientsList";


function App() {

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cleaner-form" element={<CleanerForm />} />
          <Route path ="/booking-form" element={<BookingForm />} />
          <Route path="/cleaners-list" element={<CleanersList />} />
          <Route path="/bookings-list" element={<BookingsList />} />
          {/* <Route path="/clients-list" element={<ClientsList />} /> */}
        </Routes>
      </div>
    </Router>    
  );
}

export default App;
