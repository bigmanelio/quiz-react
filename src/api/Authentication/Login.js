import React from 'react'
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import Center from '../../components/Center'
import useForm from '../../hooks/useForm'
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { useNavigate } from "react-router-dom";

const getFreshModel= ()=>({
    email: '',
    password: ''
})

export default function Login() {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `./signup`; 
      navigate(path);
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const Login = async e => {
        e.preventDefault();
        if (validate()){

            var stuff = (JSON.stringify({
                email: values.email,
                password: values.password

            }));
            console.log(stuff);
            const res = await createAPIEndpoint(ENDPOINTS.Login).post(stuff)
            .then(res.json())
            .then(data => {
                localStorage.setItem('token', data.token);
            })
            .catch(error => console.error(error));
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
                        Cardinal & White Health
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
                            sx={{ width: '90%'}}>Login</Button>
                    </form>
                    <Button
                            onClick={routeChange}
                            type="submit"
                            variant="contained"
                            size="large" 
                            sx={{ 
                                marginTop: '5px',
                                width: '90%'}}>Sign Up</Button>
                    </Box>
                </CardContent>
            </Card>
        </Center>
        
    )
}
