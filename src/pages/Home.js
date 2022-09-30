import React, { useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import List from '../components/list/List'

export default function Home() {
  const isLoggedIn = useSelector((state)=>state.login.isLogged)

  const navigate = useNavigate();

  useEffect(() => {
		if (!isLoggedIn) {
			navigate('/login')
		}
	}, [isLoggedIn, navigate])

  return (
    <main className="main">
      <List/>
    </main>
  );
}