import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import DropdownButton from '../../components/DropdownButton';
import Center from '../../components/Center';
import { createAPIEndpoint, ENDPOINTS } from '../../api';

export default function GetSurvey() {
  const [surs, setSurs] = useState({ surveys: [] });

  useEffect(() => {
    const fetchData = async () => {
      const res = await createAPIEndpoint(ENDPOINTS.survey).fetch();
      setSurs({ surveys: res.data });
      console.log(res.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Surveys</h1>
      <table>
        <thead>
          <tr>
            <th>Survey ID</th>
            <th>Name</th>
            <th>Questions</th>
          </tr>
        </thead>
        <tbody>
          {surs.surveys.map((survey, i) => (
            <tr key={survey.SurveyId}>
              <td>{survey.SurveyId}</td>
              <td>{survey.Name}</td>
              <td><DropdownButton title="Questions" content={
                survey.Questions.map((question, j) => (
                  <><div key={question.QuestId}>{question.TheQuestion}</div><DropdownButton title="Answers" content={question.Answers.map((answer) => (
                    answer.Truth = 1 ? (
                      <p key={answer.AnswerId} style={{ color: 'green' }}>{answer.TheAnswer}</p>
                    ) : (
                      <p key={answer.AnswerId}>{answer.TheAnswer}</p>
                    )
                  ))} /></>
                ))
              }/>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}