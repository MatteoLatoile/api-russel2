import Logo from "../assets/logo.png";
import Profil from "../assets/person-circle.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: "#052B4C",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 40px",
        height: "100px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Logo centré avec du padding autour */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <img
          src={Logo}
          alt="logo du site"
          style={{ height: "70px", objectFit: "contain" }}
        />
      </div>

      {/* Navigation à gauche */}
      <nav style={{ flex: 1 }}>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "30px",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            justifyContent: "flex-start",
            margin: 0,
            padding: 0
          }}
        >
          <li>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/catway" style={{ textDecoration: "none", color: "white" }}>
              Catway
            </Link>
          </li>
          <li>
            <Link
              to="/catway/reservation"
              style={{ textDecoration: "none", color: "white" }}
            >
              Reservation
            </Link>
          </li>
        </ul>
      </nav>

      {/* Icône profil à droite */}
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <Link to={"/login"}>
          <img
            src={Profil}
            alt="profil utilisateur"
            style={{ height: "50px", cursor: "pointer" }}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
