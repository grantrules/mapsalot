import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControlLabel, Switch,
} from '@material-ui/core';
import Exchanges from './Exchanges';
import Logout from './Logout';
import EventContext from '../context/EventContext';

const useStyles = makeStyles(() => ({
  root: {
    justifyContent: 'space-between',
  },
}));

function SearchToggle() {
  const { toggleUpdateSearchEnabled, updateSearchEnabled } = useContext(EventContext);
  return (
    <FormControlLabel
      control={<Switch checked={updateSearchEnabled} onChange={toggleUpdateSearchEnabled} value="updateSearchEnabled" />}
      label="Update search when clicking events"
    />
  );
}

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="relative" color="primary">
      <Toolbar className={classes.root}>
        <img alt="mapsalot" src="Spamalot.jpg" />
        <SearchToggle />
        <Exchanges />
        <Logout />
      </Toolbar>
    </AppBar>
  );
}
