import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

// Material UI
import {
  Button,
  Typography,
  Link,
  Grid,
  ButtonGroup,
  createTheme,
  ThemeProvider,
  CssBaseline
} from '@mui/material';


function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <Grid container spacing={10}
      lg='auto'
      className="nav"
      maxWidth="xl"
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        py: 3,
        backgroundImage: `linear-gradient(214deg, rgba(31,0,65,0.8) 0%, rgba(255,0,50,0.7) 100%), url(${process.env.PUBLIC_URL}/images/DeprogrammedHeader.png)`,
        backgroundSize: "cover",
        backgroundPosition: "top"
      }}>
      <Grid
        item
        sx={{ ml: 3 }}
      >
        <Link href="/#/home" underline="none" >
          <Typography
            variant="h5"
            color="warning.light"
            sx={{ textShadow: "-3px 3px 10px black", pt:0 }}
          >
            The
          </Typography>
          <Typography
            variant="h1"
            color="warning.light"
            sx={{ textShadow: "-3px 3px 10px black" }}
          >Deprogrammer</Typography>
        </Link>
      </Grid>
      <Grid item>
        <ButtonGroup 
        color="warning" 
        variant="contained"
        aria-label="primary navigation link button group">
          {/* If no user is logged in, show these links */}
          {!user.id && (
            // If there's no user, show login/registration links
            <Link className="navLink" href="/#/login">
              <Button>Login / Register</Button>
            </Link>
          )}

          {/* If a user is logged in, show these links */}
          {user.id && (
            <>
              <Link className="navLink" href="/#/user">
                <Button>Home</Button>
              </Link>

              <Link className="navLink" href="/#/list-editor">
                <Button>List Editor</Button>
              </Link>
              {user.is_admin &&
                <>
                  <Link className="navLink" href="/#/panel-editor">
                    <Button>Panel Editor</Button>
                  </Link>
                </>}
              <Link className="navLink" href="/#/play">
                <Button>Play</Button>
              </Link>
              <LogOutButton className="navLink" />
            </>
          )}

          <Link className="navLink" href="/#/about">
            <Button>About</Button>
          </Link>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

export default Nav;
