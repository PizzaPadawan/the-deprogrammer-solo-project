import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Button, Container, Paper } from '@mui/material';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterPage/RegisterForm';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <Container>
      <Paper sx={{mt:3}}>
        <Grid container>

          <Grid item xs={8}>
            <Typography sx={{ mx: 2, my: 4 }} variant="h4">"Learn 'em and love 'em, people!"</Typography>
            <Typography sx={{ mx: 2, my: 4 }} variant="body1">
              Welcome to The Deprogrammer, a gameplay and list editor companion app
              for guests and hosts of the Deprogrammed podcast!
            </Typography>
            <Typography sx={{ mx: 2, my: 4 }} variant="body2">
              With The Deprogrammer, users can create an account, view all upcoming podcast panels they belong to,
              edit their top lists, and put their songs into play during gameplay, all in one
              cohesive app. The host of the podcast can also create new masterlists by uploading
              data directly from the Spotify, add new users to podcast panels and give them
              their own copies of that masterlist to edit themselves, and manage gameplay.
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <RegisterForm />
            <Typography align="center" variant="h5">Already a Member?</Typography>
            <Button sx={{ mx: 2.9, mt: 1.5, mb: 4, px: 12.2 }} variant="contained" color="warning" onClick={onLogin}>
              Login
            </Button>
          </Grid>

        </Grid>
      </Paper>
    </Container>
  );
}

export default LandingPage;
