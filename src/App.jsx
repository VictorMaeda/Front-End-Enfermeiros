import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Plantoes from './Pages/Plantoes';
import Login from './Pages/Login';
import Enfermeiros from './Pages/Enfermeiros';
import DashBoard from './Pages/DashBoard';
import Sobre from './Pages/Sobre';
import { sessionValidate } from './services/UserService';

function App() {
  const [token, setToken] = useState(null);
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Plantoes' element={<Plantoes />} />
        <Route path='/Enfermeiros' element={<Enfermeiros />} />
        <Route path='/DashBoard' element={<DashBoard />} />
        <Route path='/sobre' element={<Sobre />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
