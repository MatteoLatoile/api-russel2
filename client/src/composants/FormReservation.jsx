import React from 'react'

const FormReservation = () => {
  return (
     <div style={{ 
  maxWidth: "400px", 
  margin: "2rem auto", 
  padding: "2rem", 
  border: "1px solid #ccc", 
  borderRadius: "10px", 
  backgroundColor: "#f9f9f9", 
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)" 
}}>
  <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#2c3e50" }}>
    Réserver un catway
  </h2>
  <form action="">
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="catway" style={{ display: "block", marginBottom: "0.5rem" }}>Catway</label>
      <select name="catway" id="catway" required style={{ 
        width: "100%", 
        padding: "0.5rem", 
        borderRadius: "5px", 
        border: "1px solid #ccc" 
      }}>
        {[...Array(12)].map((_, i) => (
          <option key={i + 1} value={i + 1}>{i + 1}</option>
        ))}
      </select>
    </div>
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="clientname" style={{ display: "block", marginBottom: "0.5rem" }}>Nom et prénom</label>
      <input type="text" id="clientname" name="clientname" required style={{
        width: "100%",
        padding: "0.5rem",
        borderRadius: "5px",
        border: "1px solid #ccc"
      }} />
    </div>
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="startdate" style={{ display: "block", marginBottom: "0.5rem" }}>Date de début</label>
      <input type="date" id="startdate" name="startdate" required style={{
        width: "100%",
        padding: "0.5rem",
        borderRadius: "5px",
        border: "1px solid #ccc"
      }} />
    </div>
    <div style={{ marginBottom: "1.5rem" }}>
      <label htmlFor="enddate" style={{ display: "block", marginBottom: "0.5rem" }}>Date de fin</label>
      <input type="date" id="enddate" name="enddate" required style={{
        width: "100%",
        padding: "0.5rem",
        borderRadius: "5px",
        border: "1px solid #ccc"
      }} />
    </div>
    <button type="submit" style={{ 
      width: "100%", 
      padding: "0.75rem", 
      backgroundColor: "#2c3e50", 
      color: "#fff", 
      border: "none", 
      borderRadius: "5px", 
      cursor: "pointer" 
    }}>
      Réserver
    </button>
  </form>
</div>

  )
}

export default FormReservation