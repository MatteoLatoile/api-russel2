import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'

const Header = () => {
  return (
    <header>
        <img src="" alt="logo du site" />
        <nav>
            <ul>
                <Link>
                
                </Link>
            </ul>
        </nav>

        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/catway" element={<Services />}></Route>
            <Route path="/reservation" element={<Portefolio />}></Route>
          </Routes>
    </header>
  )
}

export default Header