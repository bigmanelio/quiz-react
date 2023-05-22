import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DropdownButton from './DropdownButtonAnswer';
import EditTextButton from './EditTextButton';
import Button from '@mui/material/Button';
import AddQuestionButton from "./AddQuestionButton";
import DeleteButton from "./DeleteButton";
import DropdownButtonQuestion from './DropdownButtonQuestion';
import AddSurveyButton from './AddSurveyButton';
import { useNavigate } from "react-router-dom";

function DropdownButtonSurvey(props) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);





  const handleButtonClick = () => {
    console.log(props.content,"Id", props.lessonId)
    setIsDropdownVisible(!isDropdownVisible);
  };
  let navigate = useNavigate(); 
  function routeChange(surveyId){ 
    let path = `./Training/` + surveyId + `/`; 
    navigate(path);
  }
  return (
    <>
      <div style={{ border: '1px solid red' }}>
        <Button varient="contained" color="error" onClick={handleButtonClick}>
          Surveys
        </Button>
        {isDropdownVisible && (props.content.length === 0 || props.content.length === 1 && props.content[0] === null) && (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead></TableHead>

                  <TableBody>
                    <TableRow><TableCell>
                    <p>nothing to see here</p></TableCell></TableRow>

                    <AddSurveyButton table={"survey"} lessonId={props.lessonId}/>
                  </TableBody>
                </Table>
              </TableContainer>

            </>
        )}
        {isDropdownVisible && props.content.length >= 1 && props.content[0] !== null && (

          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>
                  {props.content.map((thing) => (
                    
                    <TableRow
                      key={thing.SurveyId}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>
                        <EditTextButton table={"Survey"} fieldName={"SurveyName"} id={thing.SurveyId} content={thing.Name} />
                      </TableCell>
                      <TableCell><Button color="error" onClick={() => routeChange(thing.SurveyId)}>Training</Button></TableCell>
  
                      <TableCell><DropdownButtonQuestion title="Questions" SurveyId={thing.SurveyId} content={thing.Questions}/></TableCell>
  
                      <TableCell>
                        <DeleteButton />
                      </TableCell>
                    </TableRow>

                  
                  ))}
                  <AddSurveyButton table={"survey"} lessonId={props.lessonId} />
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )} 

      </div>
    </>
  );

}

export default DropdownButtonSurvey;