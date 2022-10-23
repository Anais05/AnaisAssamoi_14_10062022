import React, { useEffect, useState } from "react";
import api from "../redux/ApiCalls";
import List from '../components/list/List'

export default function Home() {
  const [list, setList] = useState([]);

  async function getList() {
    const resp = await api.employeeList();
    const data =  resp.data.body;
    setList(data);
  }

  useEffect(() => {
    getList().catch(console.error);    
	}, [])

  return (
    <main className="main">
      <List employees={list}/>
    </main>
  );
}