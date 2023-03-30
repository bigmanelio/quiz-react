import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminNav from "../../components/AdminNav";
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import CheckAnswer from '../../components/CheckAnswer';

import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import Center from '../../components/Center';


export default function CompletedWork() {
  const params = useParams();
  const [surs, setSurs] = useState([]);
  const [ans, setAns] = useState([]);
  const accountId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      const res = await createAPIEndpoint(ENDPOINTS.Response).fetchById(accountId);
      setSurs(res.data.Surveys);
      setAns(res.data.SelectedAnswers);
    };

    fetchData();
  }, [accountId]);

  useEffect(() => {
    console.log(surs);
    console.log(ans);
  }, [surs]);



  return (
    <>
      <AdminNav />

      <Center>
        {surs.map((survey) => (
          <Card key={survey.SurveyId} variant="outlined" sx={{ width: '90vw', maxWidth: 900 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ my: 3 }}>
                {survey.Name}
              </Typography>
        
        {survey.Questions.map((question) => (
           <Card key={question.QuestId} variant="outlined" sx={{ width: '70vw', maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
           <CardContent sx={{ textAlign: 'center' }}>
             <Typography variant="h5" sx={{textAlign: 'left', my: 3 }}>
               {question.TheQuestion}
             </Typography>
        {question.Answers.map((answer) => (
           <Card key={answer.AnswerId} variant="outlined" sx={{ width: '50vw', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
           <CardContent sx={{ textAlign: 'center' }}>
            <CheckAnswer answer={answer.AnswerId} truth={answer.Truth} answers={ans} content={
             <Typography variant="h5" sx={{marginLeft: '5px', textAlign: 'left', my: 3 }}>
             {answer.TheAnswer}
           </Typography>
            }/>

           </CardContent>
         </Card>
        ))}
           </CardContent>
         </Card>

        ))}
            </CardContent>
          </Card>

        
        ))}
      </Center>
    </>
  );
}