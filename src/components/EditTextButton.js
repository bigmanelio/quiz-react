import { Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../api';




export default function EditTextButton(props) {

const [x, setX] = useState(0);
const [text, setText] = useState('');
const handleInputChange = (event) => {
  setText(event.target.value);
}



async function handleSubmit() {
  try {

   var data = (JSON.stringify({
      Id: props.id,
      Data: text

    }));

    console.log(data);
    const res = await createAPIEndpoint(props.table).patch(props.id, data);
    console.log(res.data);
    props.updateThing(props.id, text);
    setX(x + 1);
  } catch (error) {
    console.log(error);
  }
}


  return (
    <>
        <Button onClick={() => setX(x + 1)}>Edit</Button>

        {(x % 2 === 0)
        ? props.content 
        :         
        <>
          <TextField
          required
          label="Update"
          onChange={handleInputChange}
          defaultValue={props.content}/>
          <Button onClick={handleSubmit}>Submit</Button>

          
        </>

      }
        
        
        
    </>
  );
}
