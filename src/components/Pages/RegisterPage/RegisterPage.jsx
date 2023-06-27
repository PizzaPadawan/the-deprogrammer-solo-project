import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';

import { Button, Container, Grid } from '@mui/material';

function RegisterPage() {
  const history = useHistory();

  return (
    <Container maxWidth="sm">
      <Grid container>
        <Grid item xs={10}>
          <RegisterForm />
        </Grid>
        <Grid item xs={10}>
          <Button
            sx={{mx:4, px:22}}
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default RegisterPage;
