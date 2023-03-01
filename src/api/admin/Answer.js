import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import Center from '../../components/Center';

import { createAPIEndpoint, ENDPOINTS } from '..';



export default function GetAnswers() {
  const [ans, setAns] = useState({ answers: [] });

  useEffect(() => {
    const fetchData = async () => {
      const res = await createAPIEndpoint(ENDPOINTS.answer).fetch();
      setAns({ answers: res.data });
      console.log(res.data);
    };

    fetchData();
  }, []);

  return (
    <>
    <h1>Answers</h1>
    <table>
      <tbody>
        {ans.answers.map((answer, i) => (
          <tr key={answer.AnswerId}>
  
            <td>{answer.AnswerId}</td>
            <td>{answer.TheAnswer}</td>


          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}