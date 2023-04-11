import React from 'react'
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import Center from '../../components/Center'
import useForm from '../../hooks/useForm'
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';


const getFreshModel= ()=>({
    email: '',
    firstName: '',
    lastName: '',
    password: ''
})

export default function SignUp() {

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    let navigate = useNavigate(); 
    const routeChangeStudent = () =>{ 
        let path = `../`; 
        navigate(path);
      }

    const SignUp = async e => {
        e.preventDefault();
        if (validate()){
    
            var stuff = (JSON.stringify({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                pass: values.password
    
            }));
            console.log(stuff);
            let res = null;
            try {
                
                res = await createAPIEndpoint(ENDPOINTS.Register).post(stuff)
                console.log(res);
            } catch (error) {
                console.error(error);
            }
    

        }
    }

    const validate = ()=>{
        let temp ={}
        temp.firstName = values.firstName!=""?"":"This field is required."
        temp.lastName = values.lastName!=""?"":"This field is required."
        temp.email = (/\S+@\S+\.\S+/).test(values.email)?"":"Email is not valid."
        temp.password = values.password!=""?"":"This field is required."
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
                        <form noValidate onSubmit={SignUp}>
                            <TextField
                            label="First Name"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleInputChange}
                            varient="outlined" 
                            {...(errors.firstName &&{error:true, helperText:errors.firstName})}/>
                            <TextField
                            label="Last Name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleInputChange}
                            varient="outlined" 
                            {...(errors.lastName &&{error:true, helperText:errors.lastName})}/>
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
                            {...(errors.password &&{error:true, helperText:errors.password})}/>
                            <Button
                            onClick={routeChangeStudent}
                            type="submit"
                            variant="contained"
                            size="large" 
                            sx={{ width: '90%'}}>Sign up</Button>
                    </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
        
    )
}
