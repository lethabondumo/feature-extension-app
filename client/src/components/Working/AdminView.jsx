import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import CleanerForm from "../CleanerForm";
import CleanersList from "../CleanersList";
import ClientForm from "./ClientForm";
import ClientsList from "./ClientsList";

function AdminView() {
  const [cleaners, setCleaners] = useState([]);
  const [clients, setClients] = useState([]);
  // const history = useHistory();

  const addCleaner = async (cleanerData) => {
    try {
      const response = await fetch("/api/cleaners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanerData),
      });
      if (!response.ok) {
        throw new Error("Failed to add cleaner");
      }
      const newCleaner = await response.json();
      setCleaners([...cleaners, newCleaner]);
      history.push("/admin");
    } catch (error) {
      console.error("Error adding cleaner:", error);
    }
  };

  const addNewClient = async (clientData) => {
    try {
      const response = await addClient(clientData); 
      if (!response.ok) {
        throw new Error('Failed to add client');
      }
      const newClient = await response.json();
      setClients([...clients, newClient]);
      history.push('/admin');
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  return (
    <div>
      <h2>Admin View</h2>
      <CleanerForm onSubmit={addCleaner} />
      <CleanersList cleaners={cleaners} />
    </div>
  );
}

export default AdminView;
