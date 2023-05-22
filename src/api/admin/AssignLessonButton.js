import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteButton from '../../components/DeleteButton';

import { createAPIEndpoint, ENDPOINTS } from '../../api';




export default function AssignLessonButton(props) {

const [x, setX] = useState(0);


function filterLessons() {
  const foundLessons = props.lessons.filter(
    (lesson) => !props.student.AssignedLessons.includes(lesson.LessonId)
  );


  return(foundLessons);
}

async function handleSubmit(accountId, lessonId) {
  try {
  
    var data = (JSON.stringify({
       AccountId: accountId,
       LessonId: lessonId,
     }));
 
     console.log(data);
     const res = await createAPIEndpoint(ENDPOINTS.Assign).post(data);
     console.log(res.data);
     props.assignStudent(accountId, lessonId)
   } catch (error) {
     console.log(error);
   }
}


  return (
    <>
        <div style={{ border: 'solid 1px red'}}>
        <Button color="error" onClick={() => setX(x + 1)}>Assign Lessons</Button>

        {(x % 2 === 0)
        ? props.content 
        :         
        <>
                    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>

            </TableRow>
          </TableHead>
          <TableBody>
            {filterLessons().map((thing) => (
              <TableRow
                key={thing.LessonId}

              >
                <TableCell>
                    <>{thing.Name}</>

                </TableCell>
                <TableCell>  
                  <Button color="error" onClick={() => handleSubmit(props.student.AccountId, thing.LessonId)}>
                    Assign to Student
                  </Button>
                </TableCell>
              </TableRow>
            ))}


          </TableBody>
        </Table>
      </TableContainer>
        </>

      }
        
        
        </div>
    </>
  );
}
