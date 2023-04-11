import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DropdownButton from './DropdownButtonAnswer';
import EditTextButton from './EditTextButton';
import Button from '@mui/material/Button';
import AddQuestionButton from "./AddQuestionButton";
import DeleteButton from "./DeleteButton";

function DropdownButtonQuestion(props) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

function UpdateQuestion( id, question)
{
  props.updateThing(props.SurveyId, id, question);
};

function DeleteQuestion(id)
{
  props.deleteQuestion(props.SurveyId, id)
}
function UpdateAnswer( QuestId, id, answer)
{
  props.updateThing2(props.SurveyId, QuestId, id, answer);
};

function UpdateTruth( QuestId, id, answer, truth)
{
  props.updateTruth(props.SurveyId, QuestId, id, answer, truth);
};

function DeleteAnswer(QuestId, id)
{
  props.deleteAnswer(props.SurveyId, QuestId, id);
}


function AddQuestion(QuestId, id, question, answer, optional)
{
  props.AddQuestion(props.SurveyId, QuestId, id, question, answer, optional);
};

function AddAnswer(QuestId, id, answer, truth)
{
  props.addAnswer(props.SurveyId, QuestId, id, answer, truth);
};






  const handleButtonClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
    <div style={{border: '1px solid red'}}>
      <Button varient="contained" color="error" onClick={handleButtonClick}>{props.title}</Button>
      {isDropdownVisible && (
        <>


        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>

            </TableRow>
          </TableHead>
          <TableBody>
            {props.content.map((thing) => (

              thing.Optional !== 1 && (
              <TableRow
                key={thing.QuestId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell><EditTextButton  updateThing={UpdateQuestion} content={thing.TheQuestion} table={"Question"} fieldName={"TheQuestion"} id={thing.QuestId}/></TableCell>
                
                <TableCell><DropdownButton questions={props.content} deleteAnswer={DeleteAnswer} updateThing={UpdateAnswer} updateTruth={UpdateTruth} addAnswer={AddAnswer} QuestId={thing.QuestId} title="Answers" content={thing.Answers}/></TableCell>
                
                <TableCell><DeleteButton table={'question'} id={thing.QuestId} updateThing={DeleteQuestion}/></TableCell>
              </TableRow>
              )
            ))}

            <AddQuestionButton optional={0} updateThing={AddQuestion} table={"question"} id={props.SurveyId}/>
            <AddQuestionButton optional={1} updateThing={AddQuestion} table={"question/optional"} id={props.SurveyId}/>
            
            {props.content.map((thing) => (

              thing.Optional !== 0 && (
              <TableRow
                key={thing.QuestId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell><EditTextButton  updateThing={UpdateQuestion} content={thing.TheQuestion} table={"Question"} fieldName={"TheQuestion"} id={thing.QuestId}/></TableCell>
                
                <TableCell><DropdownButton questions={props.content} deleteAnswer={DeleteAnswer} updateThing={UpdateAnswer} updateTruth={UpdateTruth} addAnswer={AddAnswer} QuestId={thing.QuestId} title="Answers" content={thing.Answers}/></TableCell>
                
                <TableCell><DeleteButton table={'question'} id={thing.QuestId} updateThing={DeleteQuestion}/></TableCell>
              </TableRow>
              )
            ))}

          </TableBody>
        </Table>
      </TableContainer>
      </>
      )}
      </div>
    </>
  );
}

export default DropdownButtonQuestion;