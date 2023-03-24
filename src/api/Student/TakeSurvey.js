import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import Center from '../../components/Center';

export default function TakeSurvey() {
  const [qns, setQns] = useState([]);
  const [qnIndex, setQnIndex] = useState(0);
  const [sur, setSur] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await createAPIEndpoint(ENDPOINTS.survey).fetchById(29);
      setQns(res.data.Questions);
      setSur(res.data.Name);
    };

    fetchData();
  }, []);

  const handlePrevious = () => {
    saveAnswer(qnIndex);
    setQnIndex((prevIndex) => prevIndex - 1);
  };
  
  const handleNext = () => {
    saveAnswer(qnIndex);
    setQnIndex((prevIndex) => prevIndex + 1);
    console.log(qnIndex);
  };

  const handleAnswerClick = (questId, answerId) => {
    const updatedQns = [...qns];
    let TheQuestion = updatedQns.find(
      a => a.QuestId === questId
    );
      TheQuestion = {
      ...TheQuestion,
      SelectedAnswer: answerId,
    };
    setQns(updatedQns);
    setSelectedAnswer(answerId); // update selectedAnswer state
  };

  const saveAnswer = (index) => {
    const updatedQns = [...qns];
    updatedQns[index] = {
      ...updatedQns[index],
      SelectedAnswer: selectedAnswer,
    };
    setQns(updatedQns);
  };
  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        {sur}
      </Typography>

      <Center>
        <Card variant="outlined" sx={{ width: '90vw', maxWidth: 900 }}>
          {qns && qns.length > 0 && (
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ my: 3 }}>
                {qns[qnIndex].TheQuestion}
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {qns[qnIndex].Answers.map((answer) => (
                  <Grid item key={answer.AnswerId}>
                    <Button
                      variant={qns[qnIndex].SelectedAnswer === answer.AnswerId || selectedAnswer === answer.AnswerId ? 'contained' : 'outlined'}
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
            <Button onClick={handlePrevious} disabled={qnIndex === 0}>
              Previous
            </Button>
            <Button onClick={handleNext} disabled={qnIndex === qns.length - 1} sx={{ marginLeft: 'auto' }}>
            Next
          </Button>
        </CardActions>
      </Card>
    </Center>
  </>
);
}