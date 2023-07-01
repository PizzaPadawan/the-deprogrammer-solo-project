import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useState } from 'react';

// MUI
import {
  Button,
  Typography,
  Link,
  Grid,
  ButtonGroup,
  Menu,
  MenuItem
} from '@mui/material';


function Nav() {
  const user = useSelector((store) => store.user);

  // local state 
  const [anchorEl, setAnchorEl] = useState(null);

  // set boolean variable based on local state for 
  const open = Boolean(anchorEl);

  // handlers for Edit Link menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Grid container spacing={5}
      className="nav"
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        p: 3,
        backgroundImage: `linear-gradient(214deg, rgba(31,0,65,0.8) 0%, rgba(255,0,50,0.7) 100%), url(${process.env.PUBLIC_URL}/images/DeprogrammedHeader.png)`,
        backgroundSize: "contain",
        backgroundAttachment: "fixed"
      }}>

      {/* Title with link to home / landing page */}
      <Grid item >
        <Link href="/#/home" underline="none" >
          <Typography
            variant="h2"
            color="warning.light"
            align="center"
            sx={{ textShadow: "-3px 3px 10px black" }}
          >The Deprogrammer</Typography>
        </Link>
      </Grid>

      {/* ButtonGroup containing all other Nav Links */}
      <Grid item >

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
              {/* UserPage */}
              <Link className="navLink" href="/#/user">
                <Button>Home</Button>
              </Link>

              {user.is_admin
                ? <>
                  {/* Only have Edit Button bring up menu list if the user is an admin */}
                  <Button
                    id="edit-list-button"
                    aria-controls={open ? 'edit-list-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >Edit</Button>

                  {/* Edit Menu */}
                  <Menu
                    id="edit-list-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'edit-list-button',
                    }}>

                    <MenuItem onClick={handleClose}>
                      <Link className="navLink" href="/#/list-editor">
                        <Button>List Editor</Button>
                      </Link>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                      <Link className="navLink" href="/#/panel-editor">
                        <Button>Panel Editor</Button>
                      </Link>
                    </MenuItem>
                  </Menu>
                </>
                : <>
                  <Link className="navLink" href="/#/list-editor">
                    <Button>Edit</Button>
                  </Link>
                </>
              }

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
