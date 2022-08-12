import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/loginSlice';
import api from "../redux/ApiCalls";
import logo from '../assets/logo.png';
import './LogIn.css';

export default function LogIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
		if (token) {
      dispatch(login({token: token}));
			navigate('/')
		}
	}, [token, dispatch, navigate])

  async function handleSubmit() {
    await api.loginUser(email, password)
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