import React from 'react';
import { Typography, BottomNavigation, BottomNavigationAction } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (<BottomNavigation>
    <Typography variant="body2">&copy; 2023 Kord Maurer</Typography>
    <BottomNavigationAction label="LinkedIn" icon={<LinkedInIcon />} />
    <BottomNavigationAction label="GitHub" icon={<GitHubIcon />} />
    <BottomNavigationAction label="Email" icon={<MailOutlineIcon />} />
  </BottomNavigation>)
}

export default Footer;
