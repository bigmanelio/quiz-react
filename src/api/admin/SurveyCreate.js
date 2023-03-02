import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Divider } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import EditTextButton from '../../components/EditTextButton';
import { useNavigate } from "react-router-dom";

import useForm from '../../hooks/useForm'



const getFreshModel= ()=>({
    name: '',
    email: ''
})



export default function SurveyCreate() {
  const [surs, setSurs] = useState({ surveys: [] });
  const [question, setQuestion] = useState({1});
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange
} = useForm(getFreshModel);



  return (
    <>
    <div>
      <h1>update Survey</h1>

    </div>
    <Box sx={{
                    '& .MuiTextField-root':{
                        m: 1,
                        width: '90%'
                    }
                    }}>
                        <form noValidate >
                            <TextField
                            label="Survey Name"
                            name="Survey Name"
                            value={values.email}
                            onChange={handleInputChange}
                            varient="outlined" 
                            {...(errors.email &&{error:true, helperText:errors.email})}/>

                            <Divider sx={{}}>Questions</Divider>

                            <TableContainer component={Paper}>
                                <Table sx={{minWidth:650}} aria-label="simple table">
                                  <TableHead>
                                    <TableRow>

                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                      <TableRow
                                        sx={{'&:last-child td, &:last-child th': { border: 0 } }}
                                      >
                                    
                                    { for (x > 0) (
                                        <>
                                        <TableCell component="th" scope="survey">
                                            <TextField
                                            label="Question 1"
                                            name="Question 1"
                                            value={values.name}
                                            onChange={handleInputChange}
                                            variant="outlined" 
                                            {...(errors.name &&{error:true, helperText:errors.name})}/>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Button>dsf</Button>
                                        </TableCell>
                                        </>
                                    ))
}
                                        <TableCell>


                                        
                                        </TableCell>
                                      </TableRow>
                                    
                                        <TableRow>
                                            <TableCell>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="large" 
                                                onClick={setQuestion(question + 1)}
                                                sx={{ width: '90%'}}>Add Question</Button>
                                            </TableCell>
                                            <TableCell>
                                            <Button
                                               type="submit"
                                               variant="contained"
                                               size="large" 
                                               sx={{ width: '90%'}}>Submit</Button>
                                            </TableCell>
                                        </TableRow>
                                    

                                    
                                  </TableBody>
                                </Table>
                              </TableContainer>




                    </form>
                    </Box>
      
    </>
  );
}