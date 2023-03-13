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


function DropdownButton(props) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleButtonClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

function UpdateAnswer(id, answer)
{
  props.updateThing(props.QuestId, id, answer);
}

function AddAnswer(id, answer)
{
  props.updateThing(props.QuestId, id, answer);
}

  return (
    <>
    <div style={{ border: 'solid 1px green'}}>
      <Button varient="contained" color="success" onClick={handleButtonClick}>{props.title}</Button>
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
              <TableRow
                key={thing.AnswerId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell><EditTextButton  updateThing={UpdateAnswer} content={thing.TheAnswer} table={"Answer"} fieldName={"TheAnswer"} id={thing.AnswerId}/></TableCell>
              </TableRow>
            ))}

            <AddAnswerButton updateThing={AddAnswer} table={"answer"} id={props.QuestId} />

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