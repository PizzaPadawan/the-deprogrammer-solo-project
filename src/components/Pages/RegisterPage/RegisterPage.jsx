import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';

import { Button, Paper, Container } from '@mui/material';

function RegisterPage() {
  const history = useHistory();

  return (
    <Container maxWidth="sm">
      <Paper sx={{ mt:5 }}>
        <RegisterForm />
        <center>
          <Button
            sx={{ mx: 4, px: 22, mb:5 }}
            variant="contained"
            color="warning"
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </Button>
        </center>
      </Paper>
    </Container>
  );
}

export default RegisterPage;
