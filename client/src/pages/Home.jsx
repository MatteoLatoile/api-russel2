import { Link } from "react-router-dom";

const Homes = () => {
  return (
    // Hero
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div>
        <img src="" alt="" />
      </div>
      <div>
        <h1>Bienvenue sur le site de réservation de catways !</h1>
        <p>
          Nous sommes ravis de vous accueillir. Explorez notre site pour
          découvrir nos catways disponibles.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
            gap: "20px",
          }}
        >
          <Link
            style={{
              textDecoration: "none",
              color: "#fff",
              backgroundColor: "#007bff",
              padding: "10px 20px",
              borderRadius: "5px",
              display: "inline-block",
              marginTop: "20px",
            }}
            to="/reservation"
          >
            Reserver un catway
          </Link>
          <Link
            style={{
              textDecoration: "none",
              border: "2px solid #007bff",
              color: "#007bff",
              backgroundColor: "transparent",
              padding: "10px 20px",
              borderRadius: "5px",
              display: "inline-block",
              marginTop: "20px",
            }}
            to="/catway"
          >
            Voir nos catways
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homes;
