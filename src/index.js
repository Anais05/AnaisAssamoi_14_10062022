import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Header from "./components/header/Header";
import './index.css';

const root =  ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/login" element={< LogIn />} />
          <Route path="/employees-form"/>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
);