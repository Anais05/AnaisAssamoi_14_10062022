import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from "../redux/ApiCalls";
import List from '../components/list/List'

export default function Home() {
  const isLoggedIn = useSelector((state)=>state.login.isLogged)
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  async function getList() {
    const resp = await api.employeeList();
    const data =  resp.data.body;
    setList(data);
  }

  useEffect(() => {
    getList().catch(console.error);    
	}, [])

  useEffect(() => {
		if (!isLoggedIn) {
			navigate('/login')
		}
	}, [isLoggedIn, navigate])

  return (
    <main className="main">
      <List list={list}/>
    </main>
  );
}