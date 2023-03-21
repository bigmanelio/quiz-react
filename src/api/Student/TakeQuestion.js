import React from 'react';
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'
import { BorderAllRounded, RoundedCorner } from '@mui/icons-material';

export default function TakeQuestion(props) {
  return (

<Card varient="outlined" sx={{ width: 900  }}>
        <CardContent sx={{ textAlign: 'Center'}}>
            <Typography variant="h4" sx={{ my: 3}}>
            {props.question.TheQuestion}
            </Typography>
            <Box sx={{
            '& .MuiTextField-root':{
                m: 1,
                width: '90%'
                
            }
            }}>
            {props.question.Answers.map((answer) => (
              <Button>{answer.TheAnswer}</Button>
            ))}

            </Box>
        </CardContent>
        <CardActions>
          <Button>Previous</Button>
          <Button style={{marginLeft: 'auto'}}>Next</Button>
        </CardActions>
    </Card>

  )
}
