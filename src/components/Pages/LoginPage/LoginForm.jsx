import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

import { Container, Typography, TextField, Button } from '@mui/material';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = () => {
    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Container 
    sx={{display:'flex', flexFlow: 'column wrap'}}
    maxWidth="xs"
    > 
        <Typography variant="h5" align="center" sx={{p:1, m:2}}>Login</Typography>
        {errors.loginMessage && (
          <Typography variant="h6" className="alert" role="alert">
            {errors.loginMessage}
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
          onClick={login}
        >Log In</Button>
    </Container>
  );
}

export default LoginForm;
