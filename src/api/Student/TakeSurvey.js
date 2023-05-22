import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import StudentNav from '../../components/StudentNav';
import Center from '../../components/Center';
import { useParams } from 'react-router-dom';

export default function TakeSurvey() {
  const [qns, setQns] = useState([]);
  const [optional, setOptional] = useState([]);
  const [qnIndex, setQnIndex] = useState(0);
  const [sur, setSur] = useState('');
  const [surId, setSurId] = useState(0);
  const [readingSection, setReadingSection] = useState('');
  const [hasReadingSection, setHasReadingSection] = useState(false);
  const [continued, setContinued] = useState(false);
  const params = useParams();
  const surveyId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      const res = await createAPIEndpoint(ENDPOINTS.survey).fetchById(surveyId);
      const questions = res.data.Questions.map((question) => ({
        ...question,
        selectedAnswer: 0
      }));
      console.log(questions);

      const optionalQuestions = questions.filter((question) => question.Optional === 1);
      const nonOptionalQuestions = questions.filter((question) => question.Optional !== 1);
      setQns(nonOptionalQuestions);
      setOptional(optionalQuestions);

      setReadingSection(res.data.ReadingSection);

      if (res.data.ReadingSection != '')
      {
        setHasReadingSection(true);
      }
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

  function Continued()
  {
    let hasOptional = false;
    qns.forEach((q) => {
      const answer = q.Answers.find((a) => q.selectedAnswer === a.AnswerId && a.NextQuestion !== 0);
      if (answer !== undefined) {
        const option = optional.find((o) => o.QuestId === answer.NextQuestion);
        setQns((qa) => [...qa, option]);
        hasOptional = true;
      }
    });

    if (hasOptional === true) {
      setQnIndex((prevIndex) => prevIndex + 1);
    }
    // qns.map(question => {
    //   question.Answers.map(answer => {
        
    //     if(question.selectedAnswer === answer.AnswerId)
    //     {
    //       if(answer.NextQuestion !== 0)
    //       {
    //         optional.map((option) => {
    //           if(option.QuestId === answer.NextQuestion)
    //           {
    //             console.log(option);
    //             setQns([...qns, option]);
    //             setQnIndex((prevIndex) => prevIndex + 1);
    //           }
    //         })
    //       }
    //     }
    //   })
    // })
    setContinued(true);
  }

  async function handleSubmit() {
    try {
    
      var results = getSurveyResults(localStorage.getItem('id'), surveyId, qns);
      var resultsJson = JSON.stringify(results);
      console.log(resultsJson);

      const res = await createAPIEndpoint(ENDPOINTS.Response).post(resultsJson);
      //const stuff = JSON.parse(res.data);

      console.log(res.data);

  
    } 
    catch (error) {
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
  const hasPreviousButton = qnIndex !== 0;

  return (
    <>
      {hasReadingSection && 
        (
        <>
          <StudentNav />
          <div dangerouslySetInnerHTML={{__html: readingSection}} />
          <Button onClick={() => setHasReadingSection(false)}>To Questions</Button>
        </>
        
        )
      }
      {!hasReadingSection && (
        <div>
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
                {hasPreviousButton && (
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
                  <Button onClick={continued ? handleSubmit : Continued} variant="contained" color="primary" sx={{}}>
                    {continued ? 'Submit' : 'Continue'}
                  </Button>
                )}
              </CardActions>
            </Card>
          </Center>
        </div>
      )}
    </>
  );
}  