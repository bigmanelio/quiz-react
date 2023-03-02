import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import DropdownButtonQuestion from '../../components/DropdownButtonQuestion';
import Center from '../../components/Center';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import EditTextButton from '../../components/EditTextButton';
import { useNavigate } from "react-router-dom";

export default function GetSurvey() {
  const [surs, setSurs] = useState({ surveys: [] });

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `./create`; 
    navigate(path);
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await createAPIEndpoint(ENDPOINTS.survey).fetch();
      setSurs({ surveys: res.data });
      console.log(res.data);
    };

    fetchData();
  }, []);

  return (
    <>
    <div>
      <h1>Surveys</h1>
      <Button onClick={routeChange}>Add Entry</Button>
    </div>
      
      <TableContainer component={Paper}>
        <Table sx={{minWidth:650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SurveyId</TableCell>
              <TableCell>SurveyName</TableCell>
              <TableCell>Question</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {surs.surveys.map((survey) => (
              <TableRow
                key={survey.SurveyId}
                sx={{'&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="survey">
                  {survey.SurveyId}
                </TableCell>
                <TableCell align="left">
                <EditTextButton content={survey.Name} id={survey.SurveyId} table="Survey" fieldName="Name"/>
                </TableCell>
                <TableCell>
                
                <DropdownButtonQuestion title="Questions" content={
                survey.Questions} />
                
              
                </TableCell>
              </TableRow>
            ))

            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}