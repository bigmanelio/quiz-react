import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { createAPIEndpoint, ENDPOINTS } from '../api';



export default function AdminNav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [surveys, setSurveys] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      const res = await createAPIEndpoint(ENDPOINTS.user).fetchById(localStorage.getItem('id'));
      console.log(res.data);
      setSurveys(res.data)

    };

    fetchData();
  }, []);


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ '@media screen and (max-width: 600px)': { flexDirection: 'column' } }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <div>
          <IconButton color="inherit" aria-label="menu">
            Cardinal and White Academy
          </IconButton>
        </div>
        <div sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" onClick={handleMenuOpen}>
            Take Survey
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {surveys.map((survey) => (
              <MenuItem key={survey.SurveyId} component={Link} to={"/student/takesurvey/" + survey.SurveyId} onClick={handleMenuClose}>
                {survey.Name}
              </MenuItem>
            ))}
          </Menu>



          <Button color="inherit" component={Link} to="/student/grades/" sx={{ '@media screen and (max-width: 600px)': { marginBottom: '1rem', width: '100%' } }}>
            Grades
          </Button>
          <Button color="inherit" component={Link} to="" sx={{ '@media screen and (max-width: 600px)': { marginBottom: '1rem', width: '100%' } }}>
            {localStorage.getItem('name')}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}