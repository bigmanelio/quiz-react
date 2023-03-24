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
import withAuthorization from "../Authentication/withAuthorization";
import DeleteButton from "../../components/DeleteButton";
import AdminNav from "../../components/AdminNav";
import AssignButton from './AssignButton';
import UnassignButton from './UnassignButton';

export default function Assign() {
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await createAPIEndpoint(ENDPOINTS.user).fetch();
        console.log(res.data);
        setStudents(res.data.Students);
        setAdmins(res.data.Admins);
        setSurveys(res.data.Surveys)
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);

  function Unassign(AccountId, SurveyId) {
    const myStudents = [...students];
    const TheStudent = myStudents.find(a => a.AccountId === AccountId);
  
    TheStudent.AssignedWork = TheStudent.AssignedWork.filter(item => item !== SurveyId);
    setStudents(myStudents);
  }

  function AssignedWork(ids, accountId) {
    if (Array.isArray(ids)) {
      const foundSurveys = ids.map((surveyId) =>
        surveys.filter((survey) => survey.SurveyId === surveyId)
      );
      return foundSurveys.map((surveyArray) =>
        surveyArray.map((survey) =>  <p key={survey.SurveyId}>{survey.Name} <UnassignButton accountId={accountId} unassign={Unassign} surveyId={survey.SurveyId} /></p> )
      );
    } else {
      const foundSurveys = surveys.filter((survey) => survey.SurveyId === ids);
      if (foundSurveys.length > 0) {
        return foundSurveys.map((survey) => <> <p key={survey.SurveyId}>{survey.Name}</p> <DeleteButton/></>);
      }
      return null;
    }
  }

  function AssignStudent(AccountId, SurveyId)
  {
    const myStudents = [...students];
    const TheStudent = myStudents.find(
      a => a.AccountId === AccountId
    );

    TheStudent.AssignedWork.push(SurveyId);

    console.log(TheStudent);
    setStudents(myStudents);
  }

  return (
    <>
      <AdminNav/>
      <TableContainer component={Paper}>
        <Table sx={{minWidth:650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>AccountId</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Assigned Work</TableCell>
              <TableCell>Assign Work</TableCell>
            </TableRow>
          </TableHead>
          {students && (
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.AccountId}>
                  <TableCell>{student.AccountId}</TableCell>
                  <TableCell>{student.FirstName + " " + student.LastName}</TableCell>
                  <TableCell>{AssignedWork(student.AssignedWork, student.AccountId)}</TableCell>
                  <TableCell><AssignButton student={student} assignStudent={AssignStudent} surveys={surveys}/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  )
}