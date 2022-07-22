import React, { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './LogIn.css';


export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    navigate('/')
  };

  return (
    <main className="login-main">
      <div className="logo-container">
        <img className="logo" src={logo} alt="logo"></img>
      </div>
      <section className='log-in-content'>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
						<label htmlFor="username">Email</label>
						<input type="text" id="username" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
          </div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
					</div>
					<button className="log-in-button bg-dark">Login</button>
        </form>
      </section>
    </main>
  );
}