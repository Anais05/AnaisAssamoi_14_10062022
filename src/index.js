import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Header from "./components/header/Header";
import EmployeeForm from "./pages/EmployeeForm"
import './index.css';

const root =  ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/login" element={< LogIn />} />
          <Route path="/form" element={< EmployeeForm />}/>
        </Routes>
      </HashRouter>
    </React.StrictMode>
  </Provider>
);