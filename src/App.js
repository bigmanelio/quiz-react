import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from './api/Student/Login';
import Question from './api/admin/Question';
import Answer from './api/admin/Answer';
import Survey from './api/admin/Survey';
import SurveyCreate from './api/admin/SurveyCreate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/result" element={<Login />} />
          <Route path="/question" element={<Question />} />
          <Route path="/answer" element={<Answer />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/survey/create" element={<SurveyCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
