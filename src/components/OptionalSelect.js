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
import { createAPIEndpoint, ENDPOINTS } from '../api';

import SetTruthButton from './SetTruthButton';
import DeleteButton from './DeleteButton';



export default function OptionalSelect(props) {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const handleButtonClick = () => {
      setIsDropdownVisible(!isDropdownVisible);
    };
  
    async function handleSubmit(QuestId, TheQuestion) {
      try {
        var data = JSON.stringify({
          AnswerId: props.id,
          QuestId: QuestId
        });
  
        console.log(data);
        const res = await createAPIEndpoint(ENDPOINTS.NextQuestion).patch(props.id, data);
        const stuff = JSON.parse(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <>
        <div style={{ border: "solid 1px red" }}>
          <Button
            varient="contained"
            color="error"
            onClick={handleButtonClick}
          >
            Sequence
          </Button>
          {isDropdownVisible && (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow></TableRow>
                  </TableHead>
                  <TableBody>
                    {props.question.map(
                      (thing) =>
                        thing.Optional === 1 && (
                          <TableRow
                            key={thing.QuestId}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>
                              <>{thing.TheQuestion}</>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                              <Button
                                color="error"
                                onClick={() =>
                                  handleSubmit(thing.QuestId, thing.TheQuestion)
                                }
                              >
                                Add
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </div>
      </>
    );
  }