import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { SetIsLoggedInContext } from "../App";

const Login = () => {
  const setIsLoggedIn = useContext(SetIsLoggedInContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/login", {
      email,
      password
    }, {
      withCredentials: true
    })
    .then(result => {
      if (result.data) {
        setIsLoggedIn(true);
        navigate("/", {
          state: {
            user: result.data,
          },
        });
      } else {
        alert("Email ou mot de passe incorrect");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Erreur lors de la connexion");
    });
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "30px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#052B4C" }}>
        Connexion
      </h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
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
          Se connecter
        </button>
      </form>
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Vous n'avez pas de compte ?{" "}
        <Link to="/register" style={{ color: "#052B4C", fontWeight: "bold" }}>
          Inscrivez-vous ici
        </Link>
      </p>
    </div>
  );
};

export default Login;
