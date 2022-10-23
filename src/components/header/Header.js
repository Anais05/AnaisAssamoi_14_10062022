import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import './Header.css';

export default function Header() {

  return (
    <header className="main-nav">
      <Link to='/' className="nav-logo">
        <img src={ Logo } alt='logo HRnet' className="logo-header"></img>
      </Link>
    </header>
  );
}