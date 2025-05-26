import React, { useState, useEffect } from "react";
import axios from "axios";

const Catway = () => {
  const [catwayNumber, setCatwayNumber] = useState("");
  const [catwayType, setCatwayType] = useState("short");
  const [state, setState] = useState("good-state");
  const [otherStateValue, setOtherStateValue] = useState("");
  const [catways, setCatways] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍

  const catwayState = state === "other" ? otherStateValue : state;

  useEffect(() => {
    axios.get("http://localhost:5000/catway", { withCredentials: true })
      .then(res => setCatways(res.data))
      .catch(err => console.error("Erreur lors du chargement des catways :", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCatway = {
        catwayNumber,
        catwayType,
        catwayState
      };

      const res = await axios.post("http://localhost:5000/catway", newCatway, {
        withCredentials: true,
      });

      setCatways([...catways, res.data]);
      setCatwayNumber("");
      setCatwayType("short");
      setState("good-state");
      setOtherStateValue("");
    } catch (err) {
      console.error("Erreur lors de l'enregistrement :", err);
    }
  };

  // filtrage des catways selon la recherche
  const filteredCatways = catways.filter((catway) =>
    catway.catwayNumber.toString().includes(searchTerm.toLowerCase()) ||
    catway.catwayType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    catway.catwayState.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* form */}
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto", backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", color: "#052B4C" }}>Créer un catway</h2>

        <label>Numéro du catway</label>
        <input
          type="number"
          value={catwayNumber}
          onChange={(e) => setCatwayNumber(e.target.value)}
          required
          style={inputStyle}
        />

        <label>Type de catway</label>
        <select value={catwayType} onChange={(e) => setCatwayType(e.target.value)} style={inputStyle}>
          <option value="short">Short</option>
          <option value="long">Long</option>
        </select>

        <label>État du catway</label>
        <div>
          <label><input type="radio" name="state" value="good-state" checked={state === "good-state"} onChange={(e) => setState(e.target.value)} /> Bon état</label>
          <label style={{ marginLeft: "10px" }}><input type="radio" name="state" value="other" checked={state === "other"} onChange={(e) => setState(e.target.value)} /> Autre</label>
        </div>

        {state === "other" && (
          <input
            type="text"
            placeholder="Précisez l'état"
            value={otherStateValue}
            onChange={(e) => setOtherStateValue(e.target.value)}
            required
            style={{ ...inputStyle, marginTop: "10px" }}
          />
        )}

        <button type="submit" style={buttonStyle}>Enregistrer</button>
      </form>

      {/* searchar*/}
      <div style={{ maxWidth: "400px", margin: "30px auto" }}>
        <input
          type="text"
          placeholder=" Rechercher un catway..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ ...inputStyle, boxShadow: "0 0 5px rgba(0,0,0,0.1)" }}
        />
      </div>

      {/* affichage des catway*/}
      <div style={{ marginTop: "20px", maxWidth: "800px", marginInline: "auto" }}>
        {filteredCatways.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>Aucun catway trouvé.</p>
        ) : (
          filteredCatways.map((catway) => (
            <div key={catway._id} style={cardStyle}>
              <h3>Catway #{catway.catwayNumber}</h3>
              <p><strong>Type :</strong> {catway.catwayType}</p>
              <p><strong>État :</strong> {catway.catwayState}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "4px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#052B4C",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  fontWeight: "bold",
  cursor: "pointer"
};

const cardStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

export default Catway;
