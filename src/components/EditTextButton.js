import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';




export default function EditTextButton(props) {

const [x, setX] = useState(0);

const value={};


function Update(e)
{
  console.log(e)
}


  return (
    <>
        <Button onClick={() => setX(x + 1)}>Edit</Button>

        {(x % 2 === 0)
        ? props.content 
        :         
        <form onSubmit={Update}>
          <TextField
          required
          label="Update"
          onSubmit={ (e) => Update(e)}
          defaultValue={props.content}/>
          <Button type="submit">Submit</Button>
        </form>

      }
        
        
        
    </>
  );
}
