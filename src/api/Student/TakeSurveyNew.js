import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import StudentNav from '../../components/StudentNav';
import Center from '../../components/Center';
import { useParams } from 'react-router-dom';

export default function TakeSurveyNew() {
  const [qns, setQns] = useState([]);
  const [qnIndex, setQnIndex] = useState(0);
  const [sur, setSur] = useState('');
  const [surId, setSurId] = useState(0);
  const params = useParams();
  const surveyId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      const res = await createAPIEndpoint(ENDPOINTS.survey).fetchById(surveyId);
      const questions = res.data.Questions.map((question) => ({
        ...question,
        selectedAnswer: 0
      }));
      setQns(questions);
      setSur(res.data.Name);
      setSurId(res.data.SurveyId);
    };

    fetchData();
  }, []);

  function getSurveyResults(accountId, surveyId, questions) {
    return questions.map(question => ({
      accountId,
      surveyId,
      questId: question.QuestId,
      selectedAnswer: question.selectedAnswer
    }));
  }

  async function handleSubmit() {
    try {
    
    var results = getSurveyResults(localStorage.getItem('id'), surveyId, qns);
    var resultsJson = JSON.stringify(results);
    console.log(resultsJson);

    const res = await createAPIEndpoint(ENDPOINTS.Response).post(resultsJson);
    const stuff = JSON.parse(res.data);

    console.log(res.data);

  
    } catch (error) {
      console.log(error);
    }
  }

  const handlePrevious = () => {
    setQnIndex((prevIndex) => prevIndex - 1);
  };
  
  const handleNext = () => {
    setQnIndex((prevIndex) => prevIndex + 1);
    console.log(qnIndex);
  };

  const handleAnswerClick = (questId, answerId) => {
    const updatedQns = [...qns];
    const updatedQuestionIndex = updatedQns.findIndex(qn => qn.QuestId === questId);
    updatedQns[updatedQuestionIndex] = {
      ...updatedQns[updatedQuestionIndex],
      selectedAnswer: answerId
    };
    setQns(updatedQns);
  };

  const hasSelectedAnswerForAllQns = qns.every(qn => qn.selectedAnswer !== 0);

  return (
    <>
      <StudentNav />
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        {sur}
      </Typography>
  
      <Center>
        <Card variant="outlined" sx={{ width: '90vw', maxWidth: 900 }}>
          {qns && qns.length > 0 && (
            <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ textAlign: 'left'}}>
              {`Question ${qnIndex + 1} of ${qns.length}`}
            </Typography>
            <Typography variant="h5" sx={{ my: 3 }}>
              {qns[qnIndex].TheQuestion}
            </Typography>

            <Grid container spacing={2} justifyContent="center">
              {qns[qnIndex].Answers.map((answer) => (
                <Grid item key={answer.AnswerId}>
                  <Button
                    variant={qns[qnIndex].selectedAnswer === answer.AnswerId ? 'contained' : 'outlined'}
                    onClick={() => handleAnswerClick(qns[qnIndex].QuestId, answer.AnswerId)}
                  >
                    {answer.TheAnswer}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </CardContent>
          )}
          <CardActions>
            {qnIndex !== 0 && (
              <Button onClick={handlePrevious}>
                Previous
              </Button>
            )}
            {qnIndex !== qns.length - 1 && (
              <Button onClick={handleNext} sx={{}}>
                Next
              </Button>
            )}
            {hasSelectedAnswerForAllQns && (
              <Button onClick={handleSubmit} variant="contained" color="primary" sx={{}}>
                Submit
              </Button>
            )}
          </CardActions>
        </Card>
      </Center>
    </>
  );
}