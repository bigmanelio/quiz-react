import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import DropdownButtonQuestion from '../../components/DropdownButtonQuestion';
import DropdownButtonSurvey from '../../components/DropDownButtonSurvey';
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
import AddLessonButton from '../../components/AddLessonButton';
import { Link } from 'react-router-dom';
export default function Lesson() {

const [surs, setSurs] = useState([]);
const [lessons, setLessons] = useState([]);

useEffect(() => {
    async function getLessons() {
        try {
            const res = await createAPIEndpoint(ENDPOINTS.lesson).fetch();
            console.log(res.data);
            setLessons(res.data);
        }
        catch (error)
        {
            console.log(error);
        }
    }
    getLessons();
}, []);
  return (
    <>
    <AdminNav/>
    <h1>current user: {localStorage.getItem('name')}</h1>
      <h1>Lessons</h1>
      <AddLessonButton/>
    <TableContainer component={Paper}>

        <Table sx={{minWidth:650}} aria-label="simple table">
            <TableHead>

                <TableRow>
                    <TableCell>Lesson</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Surveys</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
  {lessons.map((lesson) => (
    <TableRow key={lesson.LessonId}>
      <TableCell>{lesson.LessonId}</TableCell>
      <TableCell><EditTextButton content={lesson.LessonName} id={lesson.LessonId} table={"Lesson"} fieldName={"Name"}/></TableCell>
      <TableCell>
        <DropdownButtonSurvey content={lesson.Surveys} lessonId={lesson.LessonId}/>
      </TableCell>
      <TableCell><DeleteButton id={lesson.LessonId} table={"lesson"}/></TableCell>
    </TableRow>
  ))}
</TableBody>
        </Table>
    </TableContainer>
    </>
  )
}
