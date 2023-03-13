import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from './api/Authentication/Login';
import Signup from './api/Authentication/Signup';
import Question from './api/admin/Question';
import Answer from './api/admin/Answer';
import Survey from './api/admin/Survey';
import AdminHome from './api/admin/AdminHome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/result" element={<Login />} />
          <Route path="/question" element={<Question />} />
          <Route path="/answer" element={<Answer />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/signup" element={<Signup />} />
           
      </Routes>
    </BrowserRouter>
  );
}

export default App;
