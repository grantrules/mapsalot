import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../context/AuthContext';


const useStyles = makeStyles(() => ({
  button: {
    color: 'rgb(255,255,255)',
    backgroundColor: 'rgba(0,0,0,.10);',
  },
}));

export default function Logout() {
  const classes = useStyles();

  const { invalidate } = useContext(AuthContext);

  return (<Button onClick={() => invalidate()} className={classes.button}>Logout</Button>);
}
