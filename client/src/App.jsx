import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Catway from "./pages/Catway";
import Header from "./composants/Header";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catway" element={<Catway />} />
      </Routes>
    </>
  );
}

export default App;
