import { borderRadius } from '@mui/system';
import React, {useState} from 'react';





export default function CheckTruth(props) {


    const [truthValue, setTruthValue] = useState(props.truth);

    function Content() {
        if (truthValue == 1)
        {
            return(
            <div style={{border: '1px solid green', borderRadius: '40px'}}>
                {props.content}
            </div>
            )
        }
        else
        {
            return(
            <div>
                {props.content}
            </div>
            )
        }
    }

  return (
    Content()
  )
}
