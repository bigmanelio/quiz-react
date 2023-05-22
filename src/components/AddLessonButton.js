import { Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

function AddLessonButton() {
  const [showCode, setShowCode] = useState(false);
  const [text, setText] = useState('');

  const handleButtonClick = () => {
    setShowCode(!showCode);
  };

  const handleTextFieldChange = (event) => {
    setText(event.target.value);
  };

 async function handleSubmit()  {
    try {
  
     var data = (JSON.stringify({
        data: text,

  
      }));
  
      console.log(data);
      const res = await createAPIEndpoint(ENDPOINTS.lesson).post(data);
      const stuff = JSON.parse(res.data);
      handleButtonClick();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
        {showCode && (
            <>
                    <TextField label={"Lesson Name"} value={text} onChange={handleTextFieldChange} />
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button onClick={handleButtonClick}>Cancel</Button>
            </>
        
        )}
        {!showCode && (
            <Button onClick={handleButtonClick}>New Lesson</Button>
        )}
            

      
    </>
  );
}
export default AddLessonButton;