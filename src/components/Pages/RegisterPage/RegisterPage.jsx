import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';

import { Button } from '@mui/material';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />
      <center>
        <Button
          sx={{ mx: 4, px: 22 }}
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
    </div>
  );
}

export default RegisterPage;
