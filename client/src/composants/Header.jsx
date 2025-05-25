import Logo from '../assets/logo.png'
import { Link, Route, Routes } from 'react-router-dom'
import "../composants/header.css"


const Header = () => {
  return (
    <header style={{
      padding: '20px',
    }}>
        <div>
          <img src={Logo} alt="logo du site" />
        </div>
        <nav>
          <ul>
            <li><Link to="/" style={{
              textDecoration: 'none',
              marginBottom: '10px'
            }}>Home</Link></li>
            <li><Link to="/catway">Catway</Link></li>
            <li><Link to="/reservation">Reservation</Link></li>
          </ul>
        </nav>
      </header>
  )
}

export default Header