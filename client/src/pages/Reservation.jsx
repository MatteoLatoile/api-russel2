import React, { useState, useEffect } from "react";
import axios from "axios";

const Reservation = () => {
  const [catwayNumber, setCatwayNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [boatName, setBoatName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reservations, setReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/reservation", {
          withCredentials: true,
        });
        setReservations(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des réservations :", err);
      }
    };

    fetchReservations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newReservation = {
        catwayNumber: Number(catwayNumber),
        clientName,
        boatName,
        startDate,
        endDate,
      };

      const res = await axios.post("http://localhost:5000/catway/reservation", newReservation, {
        withCredentials: true,
      });

      setReservations([...reservations, res.data]);
      setCatwayNumber("");
      setClientName("");
      setBoatName("");
      setStartDate("");
      setEndDate("");
    } catch (err) {
      console.error("Erreur lors de la réservation :", err);
    }
  };

  const filteredReservations = reservations.filter((reservation) =>
    reservation.catwayNumber?.toString().includes(searchTerm.toLowerCase()) ||
    reservation.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.boatName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* Formulaire de réservation */}
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#052B4C" }}>Nouvelle réservation</h2>

        <label>Numéro de catway</label>
        <input
          type="number"
          value={catwayNumber}
          onChange={(e) => setCatwayNumber(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <label>Nom du client</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <label>Nom du bateau</label>
        <input
          type="text"
          value={boatName}
          onChange={(e) => setBoatName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <label>Date de début</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <label>Date de fin</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#052B4C",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Enregistrer
        </button>
      </form>

      {/* Champ de recherche */}
      <div style={{ maxWidth: "400px", margin: "30px auto" }}>
        <input
          type="text"
          placeholder="Rechercher une réservation..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "4px",
            border: "1px solid #ccc",
            boxShadow: "0 0 5px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      {/* Liste des réservations */}
      <div style={{ marginTop: "20px", maxWidth: "800px", margin: "0 auto" }}>
        {filteredReservations.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>Aucune réservation trouvée.</p>
        ) : (
          filteredReservations.map((res) => (
            <div
              key={res._id}
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h3>Réservation Catway #{res.catwayNumber}</h3>
              <p><strong>Client :</strong> {res.clientName}</p>
              <p><strong>Bateau :</strong> {res.boatName}</p>
              <p><strong>Du :</strong> {new Date(res.startDate).toLocaleDateString()}</p>
              <p><strong>Au :</strong> {new Date(res.endDate).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reservation;
