import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SetIsLoggedInContext } from '../App';

const Logout = () => {
  const setIsLoggedIn = useContext(SetIsLoggedInContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/logout',
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        setIsLoggedIn(false);
        navigate('/login');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
      alert('Erreur lors de la déconnexion');
    }
  };

  return (
    <button
      style={{ backgroundColor: 'red', color: '#fff' }}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
