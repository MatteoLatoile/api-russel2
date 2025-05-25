import "./App.css";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Catway from "./pages/Catway";
import Header from "./composants/Header";
import Reservation from "./pages/Reservation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Création des contextes
export const IsLoggedInContext = createContext(null);
export const SetIsLoggedInContext = createContext(null);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user", { withCredentials: true })
      .then((response) => {
        if (response.data) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  return (
    <IsLoggedInContext.Provider value={isLoggedIn}>
      <SetIsLoggedInContext.Provider value={setIsLoggedIn}>
        <>
          <Header />
          <Routes>
            <Route path="/" element={isLoggedIn ?<Home /> : <Navigate to="/login" />} />
            <Route path="/catway" element={<Catway />} />
            <Route path="/catway/reservation" element={<Reservation />} />
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/register"
              element={isLoggedIn ? <Navigate to="/" /> : <Register />}
            />
          </Routes>
        </>
      </SetIsLoggedInContext.Provider>
    </IsLoggedInContext.Provider>
  );
}

export default App;
