import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
//MUI
import { Grid, Typography, Button, Container, Paper } from '@mui/material';

// CUSTOM COMPONENTS
import LoginForm from '../LoginPage/LoginForm';

function LandingPage() {
  const history = useHistory();

  // click handler to send user to Registration page
  const onRegister = (event) => {
    history.push('/registration');
  };

  return (
    <Container>
      <Paper sx={{my:5, py:3}}>
        <Grid container spacing={5} sx={{mx:'auto'}}>
          {/* description / podcast preview embed */}
          <Grid item xs={8} sx={{pb: 3}} >
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
            {/* Embed Spotify preview */}
            <iframe style={{borderRadius:"12px", width:"100%", height:152, frameBorder:0}} src="https://open.spotify.com/embed/episode/7g8LpnZa6tx8GceNzjIfGg?utm_source=generator&theme=0&t=0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          </Grid>

          {/* source in LoginForm / Button linked to RegisterPage */}
          <Grid item xs={3} sx={{my:'auto'}}>
            <LoginForm/>
            <Typography align="center" variant="h5">Not a Member?</Typography>
            <Button sx={{ mx: 2.9, mt: 1.5, mb: 4, px: 9 }} variant="contained" color="warning" onClick={onRegister}>
              Register
            </Button>
          </Grid>

        </Grid>
      </Paper>
    </Container>
  );
}

export default LandingPage;
