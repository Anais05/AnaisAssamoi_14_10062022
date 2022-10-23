import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList } from '@fortawesome/free-solid-svg-icons'
import Logo from '../../assets/logo.png';
import './Header.css';

export default function Header() {

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
            <FontAwesomeIcon className="add-icon" icon={faHome} />
            HOME
        </NavLink> 
        <NavLink to="/employee-list" className="nav-link"
          style={({ isActive }) => ({
            color: isActive ? '#2591CE' : '#ffffff', 
            backgroundColor:  isActive ? '#ffffff' : '#2591CE',
          })}>
            <FontAwesomeIcon className="home-icon" icon={faList} />
            LIST
        </NavLink> 
      </nav>
    </header>
  );
}