import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import DropdownButton from '../../components/DropdownButtonQuestion';
import { createAPIEndpoint, ENDPOINTS } from '..';


export default function GetQuestions() {
  const [qns, setQns] = useState({ questions: [] });

  useEffect(() => {
    const fetchData = async () => {
      const res = await createAPIEndpoint(ENDPOINTS.question).fetch();
      setQns({ questions: res.data });
      console.log(res.data);
    };

    fetchData();
  }, []);


  return (
    <>
    <h1>Questions</h1>
    <table>
      <tbody>
        {qns.questions.map((question, i) => (
          <tr key={question.QuestId}>
  
            <td>{question.QuestId}</td>


    
            <td>{question.TheQuestion}</td>
            <td><DropdownButton title="Answers" content={

                  question.Answers.map((answer, j) => (
                    answer.Truth = 1 ? (
                      <p key={answer.AnswerId} style={{color: 'green'}}>{answer.TheAnswer}</p>
                    ) : (
                    <p key={answer.AnswerId}>{answer.TheAnswer}</p>
                    )
                  ))
                  
            }/></td>

            

          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}