import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterPage/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            Welcome to The Deprogrammer, a gameplay and list editor companion app
            for guests and hosts of the Deprogrammed podcast!
          </p>
          <p>
            With The Deprogrammer, a host can create new masterlists by uploading
            data directly from the Spotify, add new users to podcast panels and give them
            their own copies of that masterlist to edit themselves, and manage gameplay.
            Users can create an account, view all upcoming podcast panels they belong to,
            edit their top lists, and put their songs into play during gameplay, all in one
            cohesive app. 
          </p>

        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
