import React from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
import { Button, Paper, Container } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  return (
    <Container maxWidth="sm">
      <Paper sx={{mt:5}}>
      <LoginForm />

      <center>
        <Button
          sx={{ mx: 4, px: 20.5, mb: 5 }}
          variant="contained"
          color="warning"
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </center>
      </Paper>
    </Container>
  );
}

export default LoginPage;
