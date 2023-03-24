import { Button, TextField, Switch} from '@mui/material';
//import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
//import ClearIcon from '@mui/icons-material/Clear';
import React, { useState, useEffect } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../api';




export default function SetTruthButton(props) {

const [x, setX] = useState(0);

function TruthFinder() {
    if (props.truth == 1){
    return(true)}
    else{return(false)}
}
const [truth, setTruth] = useState(TruthFinder());
const [truthIcon, setTruthIcon] = useState(props.truth);

const switchHandler = (event) => {
  setTruth(event.target.checked);
}

function Icon()
{
  if (truthIcon == 1) {
    return(" true")
  }
  else{
    return(<> false</>)
  }
}

async function handleSubmit() {
  try {
    function TruthConverter()
    {
        if (truth == true)
        {
            return(1)
        }
        else {
            return(0)
        }
    }
    
   var data = (JSON.stringify({
      Id: props.id,
      Data: props.answer,
      Truth: TruthConverter()

    }));

    console.log(data);
    const res = await createAPIEndpoint(props.table).patch(props.id, data);
    console.log(res.data);
    props.updateThing(props.id, props.answer, TruthConverter());
    setX(x + 1);
    setTruthIcon(TruthConverter());
  } catch (error) {
    console.log(error);
  }
}


  return (
    <>
    {Icon()}
        <Button onClick={() => setX(x + 1)}>Edit Truth Value</Button>

        {(x % 2 === 0)
        ? props.content 
        :         
        <>
            <Switch checked={truth} onChange={switchHandler} />
          <Button onClick={handleSubmit}>Submit</Button>

          
        </>

      }
        
        
        
    </>
  );
}
