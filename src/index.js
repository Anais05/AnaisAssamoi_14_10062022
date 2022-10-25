import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import EmployeeList from './pages/EmployeeList';
import Header from "./components/header/Header";
import Home from "./pages/Home"
import './index.css';

const root =  ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/employee-list" element={< EmployeeList />}/>
        </Routes>
      </HashRouter>
    </React.StrictMode>
  </Provider>
);