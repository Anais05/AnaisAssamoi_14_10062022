import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getList } from "../redux/employeeSlice";
import api from "../redux/ApiCalls";
import List from '../components/list/List'

export default function Home() {
  const isLoggedIn = useSelector((state)=>state.login.isLogged)
  const employees = JSON.parse(localStorage.getItem('employees'))

  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useeffect')
    getEmployeeList()
    if (employees) {
      console.log('1')
      dispatch(getList({list: employees}));
      console.log('2')
		}
	}, [employees, dispatch])

  if(!isLoggedIn) {
    navigate('/login')
  }

  async function getEmployeeList() {
    await api.employeeList();
    console.log('call')
  }

  return (
    <main className="main">
      <List />
    </main>
  );
}