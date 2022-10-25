import React from "react";
import { useSelector } from 'react-redux';
import List from '../components/list/List'

export default function EmployeeList() {
  const list = useSelector((state)=>state.list);

  return (
    <main className="main">
      <List list={list}/>
    </main>
  );
}