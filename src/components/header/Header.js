import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
          <i className="fa-solid fa-arrow-right-from-bracket logout-icon"></i>
          Logout
        </Link> 
      </nav>
    </header>
  );
}