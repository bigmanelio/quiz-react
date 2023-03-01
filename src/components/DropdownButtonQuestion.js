import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DropdownButton from './DropdownButtonAnswer';
import Button from '@mui/material/Button'

function DropdownButtonQuestion(props) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
              <TableRow
                key={thing.QuestId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{thing.TheQuestion}</TableCell>
                
                <TableCell><DropdownButton title="Answers" content={thing.Answers}/></TableCell>

              </TableRow>
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