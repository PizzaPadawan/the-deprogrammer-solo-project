import React from 'react';
//Material UI imports
import { Typography, IconButton, Container, Grid } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


function Footer() {
  return (
    <Grid container
    component="footer"
      sx={{
        mt: 'auto',
        alignItems: "center",
        justifyContent: "space-between",
        p:1,
        backgroundImage: `linear-gradient(180deg, rgba(31,0,65,1) 0%, rgba(255,0,50,1) 100%)`,
        backgroundSize: "cover",
        backgroundPosition: "fixed",
        bottom: 0, // Set the footer to the bottom of the viewport
        position: 'sticky', // Make the footer sticky
        zIndex: 1000
      }} >
      <Grid item xs={9}>
        <Typography sx={{ textShadow: "1px 1px 8px black", pt:0 }} color="warning.dark" variant="body1" >&copy; 2023 Kord Maurer</Typography>
      </Grid>
      <Grid item xs={2} sx={{textAlign: 'right'}}>
        <IconButton color="warning" href="https://www.linkedin.com/in/kord-maurer/" size="large" label="LinkedIn"><LinkedInIcon /></IconButton>
        <IconButton color="warning" href="https://github.com/PizzaPadawan" size="large"  label="GitHub"><GitHubIcon /></IconButton>
        <IconButton color="warning" href="mailto: kord.r.maurer@gmail.com" size="large"  label="Email"><MailOutlineIcon /></IconButton>
      </Grid>
    </Grid>)
}

export default Footer;
