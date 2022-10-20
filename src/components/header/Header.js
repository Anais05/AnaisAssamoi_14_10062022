import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { logout }from '../../redux/loginSlice';
import Logo from '../../assets/logo.png';
import './Header.css';

export default function Header() {
  const isLoggedIn = useSelector((state)=>state.login.isLogged)
  const dispatch = useDispatch();
  
  const signOut = () => {
    dispatch(logout());
    localStorage.removeItem('token')
  };

  if(!isLoggedIn) {
   return;
  }

  return (
    <header className="main-nav">
      <Link to='/' className="nav-logo">
        <img src={ Logo } alt='logo HRnet' className="logo-header"></img>
      </Link>
      <nav className="header-nav">
        <Link to="/login" className="nav-link" onClick={signOut}>
          <FontAwesomeIcon className="logout-icon" icon={faArrowRightFromBracket} />
          Logout
        </Link> 
      </nav>
    </header>
  );
}