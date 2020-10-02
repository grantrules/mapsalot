import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AuthContext from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({

  root: {
    height: '100vh',
    background: 'url("bg.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  error: {
  },
  errorIcon: {
    color: 'red',
  },
  input: {
    background: 'rgba(255,255,255,0.16)',
    '&:hover': {
      background: 'rgba(255,255,255,0.24)',
    },
    '&$focused': {
      background: 'rgba(255,255,255,0.24)',
    },
  },
  inputInput: {
    color: '#ffffff',
  },
  underline: {
    '&:after': {
      borderColor: 'rgb(255,0,0)',
    },
  },
  focused: {},
  inputLabel: {
    color: '#ffffff',
    opacity: 0.8,
    '&$focused': {
      opacity: 1,
      color: '#ffffff',
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const { login, loginFailed } = useContext(AuthContext);

  const [details, setDetails] = useState({ email: '', password: '' });

  const handleChange = (name) => (event) => {
    setDetails({
      ...details,
      [name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(details);
  };

  return (
    <Grid className={classes.root} container justify="center" alignItems="center">
      <Grid item xs={4}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            autoFocus
            label="Email"
            margin="normal"
            variant="filled"
            classes={{}}
            onChange={handleChange('email')}
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.focused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.input,
                focused: classes.focused,
                underline: classes.underline,
                input: classes.inputInput,
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            variant="filled"
            type="password"
            onChange={handleChange('password')}
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.focused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.input,
                focused: classes.focused,
                underline: classes.underline,
                input: classes.inputInput,
              },
            }}
          />
          <Grid container spacing={5} alignContent="center">
            <Grid item>
              <Button type="submit" size="large">Log in</Button>
            </Grid>
            <Grid item>
              {loginFailed && (
              <div className={classes.error}>
                <Typography>
                  <ErrorOutlineIcon className={classes.errorIcon} />
Login failed
                </Typography>
              </div>
              )}
            </Grid>

          </Grid>
        </form>

      </Grid>
    </Grid>
  );
}
