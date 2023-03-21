import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'
import DropdownButtonQuestion from '../../components/DropdownButtonQuestion';
import Center from '../../components/Center';
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
import withAuthorization from "../Authentication/withAuthorization";
import DeleteButton from "../../components/DeleteButton";
import AdminNav from "../../components/AdminNav";
import TakeQuestion from './TakeQuestion';


export default function TakeSurvey() {


const [qns, setQns] = useState([]);
const [qnIndex, setQnIndex] = useState(0);
const [sur, setSur] = useState('');

useEffect(() => {
    const fetchData = async () => {
      const res = await createAPIEndpoint(ENDPOINTS.survey).fetchById(19);
      setQns(res.data.Questions);
      setSur(res.data.Name);
      console.log(res.data);
    };

    fetchData();
  }, []);

  return (

    <>
    <h1 style={{textAlign: 'center'}}>{sur}</h1>

        <Center>
          <Card varient="outlined" sx={{ width: 900  }}>
        <CardContent sx={{ textAlign: 'Center'}}>
            <Typography variant="h4" sx={{ my: 3}}>
            {qns[qnIndex].TheQuestion}
            </Typography>
            <Box sx={{
            '& .MuiTextField-root':{
                m: 1,
                width: '90%'
                
            }
            }}>
            {qns.questions[qnIndex].Answers.map((answer) => (
              <Button>{answer.TheAnswer}</Button>
            ))}

            </Box>
        </CardContent>
        <CardActions>
          <Button>Previous</Button>
          <Button style={{marginLeft: 'auto'}}>Next</Button>
        </CardActions>
    </Card>
        </Center>

</>

  )
}
