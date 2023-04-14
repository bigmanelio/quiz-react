import React, { useState, useEffect, useCallback } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';

export default function GradesButton(props) {

    const [grade, setGrade] = useState();
    const handleGetGrades = useCallback(async (surveyId) => {
        const grades = await getGrades(surveyId);

      }, [getGrades]);

      async function getGrades(surveyId){
        const data = JSON.stringify({
          accountId: localStorage.getItem('id'),
          surveyId: surveyId,
        });
        const res = await createAPIEndpoint(ENDPOINTS.Grade).post(data);
        console.log(res.data)
        setGrade(res.data);
        return res.data;
      };

  return (
    <>
    <TableCell>{grade}</TableCell>
    <TableCell>
        <Button color={'error'} onClick={() => handleGetGrades(props.surveyId)}>see Grade</Button>
    </TableCell>
    </>
  )
}
