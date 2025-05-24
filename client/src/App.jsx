
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Catway from '../../backend/models/catway'

function App() {

  return (
    <>
      <header>
        <img src="" alt="logo du site" />
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/catway">Catway</Link></li>
            <li><Link to="/reservation">Reservation</Link></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catway" element={<Catway />} />
      </Routes>   

    </>
  )
}

export default App
