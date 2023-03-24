import { Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../../api';




export default function UnassignButton(props) {

const [x, setX] = useState(0);




async function handleSubmit() {
    try {
    
      var data = (JSON.stringify({
         AccountId: props.accountId,
         SurveyId: props.surveyId,
       }));
   
       console.log(data);
       const res = await createAPIEndpoint(ENDPOINTS.Unassign).post(data);
       console.log(res.data);
       props.unassign(props.accountId, props.surveyId);
     } catch (error) {
       console.log(error);
     }
  }


  return (
    <>
        <Button varient="contained" color="error" onClick={() => setX(x + 1)}>Unassign</Button>

        {(x % 2 === 0)
        ? props.content 
        :         
        <>

          <Button onClick={handleSubmit}>Yes </Button>

          
        </>

      }
        
        
        
    </>
  );
}
