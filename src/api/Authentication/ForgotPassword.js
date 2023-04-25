import React, { useState, useRef } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import Center from '../../components/Center'
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';

export default function ForgotPassword() {
  const [text, setText] = useState('');
  const [forgotReturn, setForgotReturn] = useState();
  const [continued, setContinued] = useState(false);
  const phoneNumberRef = useRef(null); // add this line

  let navigate = useNavigate(); 
  const routeChangeChange = () =>{ 
    let path = `Change/`
    navigate(path);
  }

  const handleTextFieldChange = (event) => {
    setText(event.target.value);
  };

  async function handleSubmit(event)  {
    event.preventDefault();
    try {
      var data = JSON.stringify({
        Value: text,
      });
      const res = await createAPIEndpoint(ENDPOINTS.sms).post(data);
      const jsonString = JSON.stringify(res.data);
      const jsonData = JSON.parse(jsonString);
      setForgotReturn(jsonData);
      console.log(jsonData);
      setContinued(true);
      setText('');
      phoneNumberRef.current.value = ''; // clear the text field display
    } catch (error) {
      console.log(error);
    }
  }

  async function Continued(event) {
    event.preventDefault();
    const num = Number(text);
    if (forgotReturn && num === forgotReturn.Code) {
      let encryptedData = CryptoJS.AES.encrypt(forgotReturn.AccountId.toString(), 'funnyStuff').toString();
      localStorage.setItem('change', encryptedData);
      routeChangeChange();
    }


    console.log(text);
  }

  return (
    <>
      <Center>
        <Card sx={{ width: 400 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ my: 3 }}>Forgot Password?</Typography>
            <Box sx={{
              '& .MuiTextField-root': {
                m: 1,
                width: '90%'
              }
            }}>
              <form noValidate onSubmit={continued ? Continued : handleSubmit}>
                <TextField
                  label={continued ? 'Code' : 'Phone Number'}
                  onChange={handleTextFieldChange}
                  variant="outlined"
                  inputRef={phoneNumberRef} // add this line
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ width: '90%' }}
                >
                  {continued ? 'Enter Code' : 'Enter Phone Number'}
                </Button>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Center>
    </>
  )
}