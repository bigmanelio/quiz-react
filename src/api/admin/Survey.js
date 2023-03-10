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

function UpdateSurvey(SurveyId, name)
{
    const mySurvey = [...surs.surveys];
    const TheSurvey = mySurvey.find(
      a => a.SurveyId === SurveyId
    );

    TheSurvey.Name = name;
    setSurs({surveys: mySurvey})
    
}

function UpdateQuestion(SurveyId, QuestId, question)
{
  console.log(SurveyId, QuestId, question)
    const mySurvey = [...surs.surveys];
    const TheSurvey = mySurvey.find(
      a => a.SurveyId === SurveyId
    );
    const Questions = TheSurvey.Questions;
    
    const TheQuestion = Questions.find(
      a => a.QuestId === QuestId
    );
    TheQuestion.TheQuestion = question;

    setSurs(prevState => {
      const updatedSurveyIndex = prevState.surveys.findIndex(survey => survey.SurveyId === SurveyId);
      const updatedSurvey = { ...prevState.surveys[updatedSurveyIndex], Questions };
      const updatedSurveys = [...prevState.surveys];
      updatedSurveys[updatedSurveyIndex] = updatedSurvey;
      return { surveys: updatedSurveys };
    });
    
}

function UpdateAnswer(SurveyId, QuestId, id, answer)
{
  console.log(SurveyId, QuestId, id, answer)

  const mySurvey = [...surs.surveys];
  const TheSurvey = mySurvey.find(
    a => a.SurveyId === SurveyId
  );
  const Questions = TheSurvey.Questions;
  
  const TheQuestion = Questions.find(
    a => a.QuestId === QuestId
  );
  
  const Answers = TheQuestion.Answers;

  const TheAnswer = Answers.find(
    a => a.AnswerId === id
  );

  TheAnswer.TheAnswer = answer;

  setSurs(prevState => {
    const updatedSurveys = prevState.surveys.map(survey => {
      if (survey.SurveyId === SurveyId) {
        const updatedQuestions = survey.Questions.map(question => {
          if (question.QuestId === QuestId) {
            const updatedAnswers = question.Answers.map(answerItem => {
              if (answerItem.AnswerId === id) {
                return { ...answerItem, TheAnswer: answer };
              }
              return answerItem;
            });
            return { ...question, Answers: updatedAnswers };
          }
          return question;
        });
        return { ...survey, Questions: updatedQuestions };
      }
      return survey;
    });
    return { surveys: updatedSurveys };
  });
}

  




  
  return (
    <>
    <div>
      <h1>Surveys</h1>
      <Button>Add Entry</Button>
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
                <EditTextButton updateThing={UpdateSurvey} content={survey.Name} id={survey.SurveyId} table={"Survey"} fieldName={"Name"}/>
                </TableCell>
                <TableCell>
                
                <DropdownButtonQuestion title="Questions" SurveyId={survey.SurveyId} updateThing={UpdateQuestion} updateThing2={UpdateAnswer} content={
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