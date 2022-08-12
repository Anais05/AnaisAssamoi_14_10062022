import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout }from '../../redux/loginSlice';
import Logo from '../../assets/logo.png';
import './Header.css';


export default function Header() {
  const isLoggedIn = useSelector((state)=>state.login.isLogged)
  const dispatch = useDispatch();

  console.log(isLoggedIn)

  if(!isLoggedIn) {
   return
  }

  const signOut = () => {
    dispatch(logout());
    localStorage.removeItem('token')
  };

  return (
    <header className="main-nav">
      <Link to='/' className="nav-logo">
        <img src={ Logo } alt='logo HRnet' className="logo-header"></img>
      </Link>
      <nav className="header-nav">
        <NavLink to="/" className="nav-link" 
          style={({ isActive }) => ({
            color: isActive ? '#2591CE' : '#ffffff', 
            backgroundColor:  isActive ? '#ffffff' : '#2591CE',
          })}>
          Liste
        </NavLink>
        <NavLink to="/new" className="nav-link"
          style={({ isActive }) => ({
            color: isActive ? '#2591CE' : '#ffffff', 
            backgroundColor:  isActive ? '#ffffff' : '#2591CE',
          })}>
          Creation
        </NavLink> 
        <Link to="/login" className="nav-link" onClick={signOut}>
          <i className="fa-solid fa-arrow-right-from-bracket logout-icon"></i>
          Déconnexion
        </Link> 
      </nav>
    </header>
  );
}