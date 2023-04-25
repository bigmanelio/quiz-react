import React from 'react'
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import Center from '../../components/Center'
import useForm from '../../hooks/useForm'
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';


const getFreshModel= ()=>({
    password1: '',
    password2: ''
})

export default function ChangePassword() {

    let navigate = useNavigate(); 
    const routeChangeSignUp = () =>{ 
      let path = `./signup`; 
      navigate(path);
    }
    const routeChangeAdmin = () =>{ 
        let path = `./admin`; 
        navigate(path);
      }
      const routeChangeStudent = () =>{ 
        let path = `./student`; 
        navigate(path);
      }
      const routeChangeForgotPassword = () =>{ 
        let path = `./forgot`; 
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

        let encryptedData = localStorage.getItem('change');
        let decryptedData = CryptoJS.AES.decrypt(encryptedData, 'funnyStuff').toString(CryptoJS.enc.Utf8);
    
            var stuff = (JSON.stringify({
                AccountId: decryptedData,
                Password: values.password1
    
            }));
            console.log(stuff);
            let res = null;
            try {
                res = await createAPIEndpoint(ENDPOINTS.Change).post(stuff)
                console.log(res.data)





            } catch (error) {
                console.error(error);
            }
    

        }
    }

    

    const validate = () => {
        let temp = {};
        if (values.password1 !== values.password2) {
          temp.password2 = "Passwords do not match.";
        } else {
          temp.password2 = "";
        }
        setErrors(temp);
        return Object.values(temp).every((x) => x === "");
      };

    return ( 
        <Center>
            <Card sx={{ width: 400 }}>
                <CardContent sx={{ textAlign: 'Center'}}>
                    <Typography variant="h3" sx={{ my: 3}}>
                        Change Password
                    </Typography>
                    <Box sx={{
                    '& .MuiTextField-root':{
                        m: 1,
                        width: '90%'
                    }
                    }}>
                        <form noValidate onSubmit={Login}>
                            <TextField
                            label="Password"
                            type="password"
                            name="password1"
                            value={values.password1}
                            onChange={handleInputChange}
                            varient="outlined" 
                            {...(errors.password1 &&{error:true, helperText:errors.password1})}/>
                            <TextField
                                label="Reenter Password"
                                type="password"
                                name="password2"
                                value={values.password2}  // change values.password to values.password2
                                onChange={handleInputChange}
                                variant="outlined" 
                                {...(errors.password2 &&{error:true, helperText:errors.password2})}
                            />
                            <Button
                            type="submit"
                            variant="contained"
                            size="large" 
                            sx={{ width: '90%'}}>Change</Button>
                    </form>

                    </Box>
                </CardContent>
            </Card>
        </Center>
        
    )
}
