import { Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../api';




export default function DeleteButton(props) {

const [x, setX] = useState(0);




async function handleSubmit() {
  try {



    const res = await createAPIEndpoint(props.table).delete(props.id);
    console.log(res.data);
    props.updateThing(props.id);
    setX(x + 1);
  } catch (error) {
    console.log(error);
  }
}


  return (
    <>
        <Button varient="contained" color="error" onClick={() => setX(x + 1)}>Delete</Button>

        {(x % 2 === 0)
        ? props.content 
        :         
        <>

          <Button onClick={handleSubmit}>Yes Delete</Button>

          
        </>

      }
        
        
        
    </>
  );
}
