import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditTextButton from './EditTextButton';
import AddAnswerButton from './AddAnswerButton';
import CheckTruth from './CheckTruth';
import SetTruthButton from './SetTruthButton';
import DeleteButton from './DeleteButton';
import OptionalSelect from './OptionalSelect';


function DropdownButton(props) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleButtonClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  function UpdateAnswer(id, answer) {
    props.updateThing(props.QuestId, id, answer);
  }

  function UpdateTruth(id, answer, truth) {
    props.updateTruth(props.QuestId, id, answer, truth);
  }

  function DeleteAnswer(id) {
    props.deleteAnswer(props.QuestId, id);
  }

  function AddAnswer(id, answer, truth) {
    props.addAnswer(props.QuestId, id, answer, truth);
  }

  function findQuestionById(id) {
    const question = props.questions.find((question) => question.QuestId === id);
    return question ? question.TheQuestion : '';
  }

  return (
    <>
      <div style={{ border: 'solid 1px red' }}>
        <Button varient="contained" color="error" onClick={handleButtonClick}>
          {props.title}
        </Button>
        {isDropdownVisible && (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>
                  {props.content.map((thing) => (
                    <TableRow key={thing.AnswerId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell>
                        <>
                          <EditTextButton updateThing={UpdateAnswer} content={thing.TheAnswer} table={'Answer'} fieldName={'TheAnswer'} id={thing.AnswerId} />
                          <SetTruthButton answer={thing.TheAnswer} table={'answer'} id={thing.AnswerId} truth={thing.Truth} updateThing={UpdateTruth} />
                        </>
                      </TableCell>
                      <TableCell>{findQuestionById(thing.NextQuestion)}</TableCell>
                      <TableCell>
                        <OptionalSelect question={props.questions} id={thing.AnswerId} />
                      </TableCell>
                      <TableCell>
                        <DeleteButton table={'answer'} updateThing={DeleteAnswer} id={thing.AnswerId} />
                      </TableCell>
                    </TableRow>
                  ))}

                  <AddAnswerButton addAnswer={AddAnswer} table={'answer'} id={props.QuestId} />
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </div>
    </>
  );
}
export default DropdownButton;