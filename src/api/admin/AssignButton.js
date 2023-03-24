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




export default function AssignButton(props) {

const [x, setX] = useState(0);


function filterSurveys() {
  const foundSurveys = props.surveys.filter(
    (survey) => !props.student.AssignedWork.includes(survey.SurveyId)
  );


  return(foundSurveys);
}

async function handleSubmit(accountId, surveyId) {
  try {
  
    var data = (JSON.stringify({
       AccountId: accountId,
       SurveyId: surveyId,
     }));
 
     console.log(data);
     const res = await createAPIEndpoint(ENDPOINTS.Assign).post(data);
     console.log(res.data);
     props.assignStudent(accountId, surveyId)
   } catch (error) {
     console.log(error);
   }
}


  return (
    <>
        <div style={{ border: 'solid 1px red'}}>
        <Button color="error" onClick={() => setX(x + 1)}>Assign Work</Button>

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
            {filterSurveys().map((thing) => (
              <TableRow
                key={thing.SurveyId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                    <>{thing.Name}</>

                </TableCell>
                <TableCell>  
                  <Button color="error" onClick={() => handleSubmit(props.student.AccountId, thing.SurveyId)}>
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
