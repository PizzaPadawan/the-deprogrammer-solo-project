import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, Button, TextField, Grid, Container } from '@mui/material';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = () => {
    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
      <Container 
      sx={{display:'flex', flexFlow: 'column wrap'}}
      maxWidth="xs"
      > 
          <Typography variant="h5" align="center" sx={{p:1, m:2}}>Register User</Typography>
          {errors.registrationMessage && (
            <Typography sx={{mb:2}} color="error" variant="body2" className="alert" role="alert">
              {errors.registrationMessage}
            </Typography>
          )}
          <TextField
            sx={{pb:1}}
            type="text"
            label="Username"
            value={username}
            required
            size="small"
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            size="small"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
          <br/>
          <Button
            sx={{mb: 2 }}
            type="submit"
            name="submit"
            color="warning"
            variant="contained"
            onClick={registerUser}
          >Register</Button>
      </Container>
  );
}

export default RegisterForm;
