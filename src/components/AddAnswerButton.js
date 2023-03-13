import { Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

function AddAnswerButton(props) {
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
        Id: props.id,
        Data: text

  
      }));
  
      console.log(data);
      const res = await createAPIEndpoint(props.table).post(data);
      const stuff = JSON.parse(res.data);
      props.updateThing(stuff.AnswerId, stuff.TheAnswer);
      handleButtonClick();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
        {showCode && (
            <TableRow>
                <TableCell>
                    <TextField label={props.table} value={text} onChange={handleTextFieldChange} />
                    <Button onClick={handleSubmit}>Submit</Button>
                </TableCell>
                <TableCell></TableCell>
            </TableRow>
        
      )}
      <TableRow>
        <TableCell>
            <Button onClick={handleButtonClick}>Add Answer</Button>
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
      
    </>
  );
}
export default AddAnswerButton;