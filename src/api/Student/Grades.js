import React, { useState, useEffect, useCallback } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import GradesButton from '../../components/GradesButton';
import StudentNav from '../../components/StudentNav';

export default function Grades() {
  const [surs, setSurs] = useState([]);
  const [grades, setGrades] = useState([]);





  useEffect(() => {
    const fetchData = async () => {
      const res = await createAPIEndpoint(ENDPOINTS.user).fetchById(localStorage.getItem('id'));
      console.log(res.data);
      setSurs(res.data);
    };

    fetchData();
  }, []);

  return (
    <>
    <StudentNav/>
    <TableContainer component={Paper}>
        <Table sx={{minWidth:650}} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Surveys</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {surs.map((survey) => (
      <TableRow key={survey.SurveyId}>
        <TableCell>{survey.Name}</TableCell>
        
        <GradesButton surveyId={survey.SurveyId}/>

        </TableRow>
    ))}

      </TableBody>
    </Table>
    </TableContainer>

    </>
  )
}