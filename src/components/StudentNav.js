import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';



export default function AdminNav() {


  return (
        <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/student/takesurvey">Take Survey</Button>
          <Button color="inherit" component={Link} to="/admin/assign">Settings</Button> 
          <Button style={{marginLeft: 'auto'}}color="inherit" component={Link} to="">{localStorage.getItem("name")}</Button>
        </Toolbar>
 
      </AppBar>
    </div>
  );
}