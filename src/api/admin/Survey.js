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



export default withAuthorization('Admin')(function GetSurvey() {
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

  function AddSurvey(SurveyId, Name, questions)
  {
    const newSurvey = {
      SurveyId: SurveyId,
      Name: Name,
      Questions: questions,
    };
    setSurs(prevState => {
      const updatedSurveys = [newSurvey, ...prevState.surveys];
      return { surveys: updatedSurveys};
    });
  }
  
  async function newSurvey()
  {
    try {
       const res = await createAPIEndpoint(ENDPOINTS.survey).post();
       const stuff = JSON.parse(res.data);
       console.log(stuff);
       const questions = [
        {
        QuestId: stuff.QuestId,
        TheQuestion: stuff.TheQuestion,
        Answers: [
          {
            AnswerId: stuff.AnswerId,
            TheAnswer: stuff.TheAnswer,
            truth: stuff.Truth,
          },
    
        ]
      }
       ];
       AddSurvey(stuff.SurveyId, stuff.Name, questions);
  
     } catch (error) {
       console.log(error);
     }
  }

function UpdateSurvey(SurveyId, name)
{
    const mySurvey = [...surs.surveys];
    const TheSurvey = mySurvey.find(
      a => a.SurveyId === SurveyId
    );

    TheSurvey.Name = name;
    setSurs({surveys: mySurvey})
    
}

function DeleteSurvey(SurveyId) {
  setSurs(prevState => {
    const updatedSurveys = prevState.surveys.filter(survey => survey.SurveyId !== SurveyId);
    return { surveys: updatedSurveys };
  });
}

function DeleteQuestion(SurveyId, QuestId) {
  setSurs(prevState => {
    const updatedSurveys = prevState.surveys.map(survey => {
      if (survey.SurveyId === SurveyId) {
        const updatedQuestions = survey.Questions.filter(question => question.QuestId !== QuestId);
        return { ...survey, Questions: updatedQuestions };
      }
      return survey;
    });
    return { surveys: updatedSurveys };
  });
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

function DeleteAnswer(SurveyId, QuestId, id) {
  setSurs(prevState => {
    const updatedSurveys = prevState.surveys.map(survey => {
      if (survey.SurveyId === SurveyId) {
        const updatedQuestions = survey.Questions.map(question => {
          if (question.QuestId === QuestId) {
            const updatedAnswers = question.Answers.filter(answerItem => answerItem.AnswerId !== id);
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

function UpdateAnswer(SurveyId, QuestId, id, answer, truth)
{
  console.log(SurveyId, QuestId, id, answer, truth)

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

  if(truth != null)
  {
    TheAnswer.truth = truth;
  }


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



function AddQuestion(SurveyId, QuestId, id, question, answer)
{
  console.log(SurveyId, QuestId, id, question, answer)

  const newQuestion = {
    QuestId: QuestId,
    TheQuestion: question,
    Answers: [
      {
        AnswerId: id,
        TheAnswer: answer,
      },

    ]
  };
  setSurs(prevState => {
    const updatedSurveys = prevState.surveys.map(survey => {
      if (survey.SurveyId === SurveyId) {
        const updatedQuestions = [...survey.Questions, newQuestion];
        return { ...survey, Questions: updatedQuestions };
      }
      return survey;
    });
    return { surveys: updatedSurveys };
  });
}

function AddAnswer(SurveyId, QuestId, id, answer, truth)
{
    console.log(SurveyId, QuestId, id, answer, truth)
  
    try {
    const newAnswer = {
      AnswerId: id,
      TheAnswer: answer,
    };
  

    setSurs(prevState => {
      const updatedSurveys = prevState.surveys.map(survey => {
        if (survey.SurveyId === SurveyId) {
          const updatedQuestions = survey.Questions.map(question => {
            if (question.QuestId === QuestId) {
              const updatedAnswers = [...question.Answers, newAnswer]
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
catch (error) {
  console.log(error);
}
}
  




  return (
    <>
    <div>
      <AdminNav/>
      <h1>current user: {localStorage.getItem('name')}</h1>
      <h1>Surveys</h1>
      <Button onClick={newSurvey}>Add Entry</Button>
    </div>
      
      <TableContainer component={Paper}>
        <Table sx={{minWidth:650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SurveyId</TableCell>
              <TableCell>SurveyName</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Delete</TableCell>
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
                
                <DropdownButtonQuestion title="Questions" SurveyId={survey.SurveyId} deleteQuestion={DeleteQuestion} deleteAnswer={DeleteAnswer} updateThing={UpdateQuestion} updateTruth={UpdateAnswer} updateThing2={UpdateAnswer} AddQuestion={AddQuestion} addAnswer={AddAnswer} content={
                survey.Questions} />
                
              
                </TableCell>
                <TableCell>
                  <DeleteButton id={survey.SurveyId} updateThing={DeleteSurvey} table={'survey'}/>
                </TableCell>
              </TableRow>
            ))

            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
    
  
})