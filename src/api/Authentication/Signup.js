import React from 'react'
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import Center from '../../components/Center'
import useForm from '../../hooks/useForm'

const getFreshModel= ()=>({
    email: '',
    password: ''
})

export default function Login() {

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const Login = e => {
        e.preventDefault();
        if (validate()){
            console.log(values);
        }

    }

    const validate = ()=>{
        let temp ={}
        temp.email = (/\S+@\S+\.\S+/).test(values.email)?"":"Email is not valid."
        temp.password = values.name!=""?"":"This field is required."
        setErrors(temp)
        return Object.values(temp).every(x=> x == "")
    }

    return ( 
        <Center>
            <Card sx={{ width: 400 }}>
                <CardContent sx={{ textAlign: 'Center'}}>
                    <Typography variant="h3" sx={{ my: 3}}>
                        Sign Up
                    </Typography>
                    <Box sx={{
                    '& .MuiTextField-root':{
                        m: 1,
                        width: '90%'
                    }
                    }}>
                        <form noValidate onSubmit={Login}>
                            <TextField
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            varient="outlined" 
                            {...(errors.email &&{error:true, helperText:errors.email})}/>
                            <TextField
                            label="Password"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleInputChange}
                            variant="outlined" 
                            {...(errors.name &&{error:true, helperText:errors.password})}/>
                            <Button
                            type="submit"
                            variant="contained"
                            size="large" 
                            sx={{ width: '90%'}}>Start</Button>
                    </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
        
    )
}
