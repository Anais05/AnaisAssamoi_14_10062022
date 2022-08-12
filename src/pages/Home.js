import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getList } from "../redux/employeeSlice";
import api from "../redux/ApiCalls";
import List from '../components/list/List'

export default function Home() {
  const isLoggedIn = useSelector((state)=>state.login.isLogged)
  const list = JSON.parse(localStorage.getItem('list'))

  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    getEmployeeList()
    if (list) {
      dispatch(getList({list: list}));
		}

	}, [list, dispatch])

  if(!isLoggedIn) {
    navigate('/login')
  }

  async function getEmployeeList() {
    await api.employeeList();
  }

  return (
    <main className="main">
      <List list={list} />
    </main>
  );
}