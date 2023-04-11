import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from './api/Authentication/Login';
import Signup from './api/Authentication/Signup';
import Question from './api/admin/Question';
import Answer from './api/admin/Answer';
import Survey from './api/admin/Survey';
import AdminHome from './api/admin/AdminHome';
import StudentHome from './api/Student/StudentHome';
import TakeSurvey from './api/Student/TakeSurvey';
import Assign from './api/admin/Assign';
import Grades from './api/Student/Grades';
import CompletedWork from './api/admin/CompletedWork';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/result" element={<Login />} />
          <Route path="/question" element={<Question />} />
          <Route path="/answer" element={<Answer />} />
          <Route path="admin/survey" element={<Survey />} />
          <Route path="admin/completedwork/:id" element={<CompletedWork />} />
          <Route path="admin/assign" element={<Assign />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/student" element={<StudentHome/>} />
          <Route path="/student/takesurvey/:id" element={<TakeSurvey/>} />
          <Route path="/student/grades/" element={<Grades/>} />
          <Route path="/signup" element={<Signup />} />
           
      </Routes>
    </BrowserRouter>
  );
}

export default App;
