import React from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import List from '../components/list/List'

export default function Home() {
  const isLoggedIn = useSelector((state)=>state.login.isLogged)

  const navigate = useNavigate();

  if(!isLoggedIn) {
    navigate('/login')
  }

  return (
    <main className="main">
      <List/>
    </main>
  );
}