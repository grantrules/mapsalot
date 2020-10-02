import React, { useMemo } from 'react';
import {
  Select, MenuItem, FormControl, InputLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useExchange } from '../context/ExchangeContext';

const exchanges = [
  { id: 1, exchange: 'StubHub' },
  { id: 2, exchange: 'TicketMaster' },
  { id: 3, exchange: 'VividSeats' },
];

const useStyles = makeStyles(() => ({

  root: {
    width: '200px',
  },
  exchangeSelect: {
    color: 'rgb(255,255,255)',
  },
  focused: {},
  inputLabel: {
    color: '#ffffff',
    opacity: 0.8,
    '&$focused': {
      opacity: 1,
      color: '#ff0000',
    },
  },
}));

function Exchanges() {
  const classes = useStyles();
  const { values, updateExchangeId } = useExchange();

  function handleChange(event) {
    updateExchangeId(event.target.value);
  }
  return useMemo(() => (
    <FormControl className={classes.root}>
      <InputLabel className={classes.inputLabel} htmlFor="age-simple">Exchange</InputLabel>
      <Select
        className={classes.exchangeSelect}
        value={values.exchangeId}
        onChange={handleChange}
        inputProps={{
          name: 'exchange',
          id: 'exchange',
        }}
      >
        {exchanges.map((
          { id, exchange },
        ) => (
          <MenuItem key={id} value={id}>{exchange}</MenuItem>
        ))}
      </Select>
    </FormControl>
  ), [values.exchangeId]);
}

export default Exchanges;
