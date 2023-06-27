import React, { useEffect } from 'react';
import './App.css'
//Router
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Shared components
import Nav from './Shared/Nav/Nav';
import Footer from './Shared/Footer/Footer';
// Middleware component
import ProtectedRoute from './Shared/ProtectedRoute/ProtectedRoute';
// Page components
import AboutPage from './Pages/AboutPage/AboutPage';
import UserPage from './Pages/UserPage/UserPage';
import LandingPage from './Pages/LandingPage/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import PanelEditor from './Pages/PanelEditor/PanelEditor';
import ListEditor from './Pages/ListEditor/ListEditor';
import PlayPage from './Pages/PlayPage/PlayPage';

//Material UI
import { createTheme, ThemeProvider, Container } from '@mui/material';

const font = "'Montserrat', sans-serif";
const theme = createTheme({
  typography: {
    fontFamily: font,
  }
});

function App() {

  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }} disableGutters maxWidth={false}>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute
              // admin shows PanelEditor else shows UserPage
              exact
              path="/panel-editor"
            >
              {user.is_admin
                ? <PanelEditor />
                : <Redirect to="/list-editor" />}
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/list-editor">
              <ListEditor />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/play">
              <PlayPage />
            </ProtectedRoute>

            <Route
              exact
              path="/login"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the login page
                <LoginPage />
              }
            </Route>

            <Route
              exact
              path="/registration"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the registration page
                <RegisterPage />
              }
            </Route>

            <Route
              exact
              path="/home"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the Landing page
                <LandingPage />
              }
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
