import React from 'react'

export default function CheckAnswer(props) {

      const hasMatch = props.answers.includes(props.answer);
    
      function TruthFinder() {
        if (props.truth == 1){
        return(true)}
        else{return(false)}
    }
    
  
      return (
        <div style={{border: hasMatch ? '1px solid red' : 'none', color: TruthFinder() ? 'red' : 'none'}}>
          {props.content}
        </div>
      )
  
  
    
}
