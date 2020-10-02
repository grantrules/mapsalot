/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { Grid, Typography } from '@material-ui/core';
import { useMutation } from 'graphql-hooks';
import { dateformat } from '../utils/date';
import { useExchange } from '../context/ExchangeContext';

const MAP_EVENT_MUTATION = `mutation Map($bgEventId: Int!, $exchangeId: Int!, $exchangeEventId: Int!) {
  map(bgEventId: $bgEventId, exchangeId: $exchangeId, exchangeEventId: $exchangeEventId)
  }`;

function MapTable({ left, right, children }) {
  return (
    <Grid container spacing={1} justify="center">
      <Grid container item xs={12} spacing={0}>
        <Grid item xs>
          <Typography>{left}</Typography>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs>
          <Typography>{right}</Typography>
        </Grid>
        {children}
      </Grid>
    </Grid>
  );
}

MapTable.propTypes = {
  left: PropTypes.string.isRequired,
  right: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function Row({ left, right }) {
  return (
    <Grid container item xs={12} spacing={0}>
      <Grid item xs>
        <Typography>{left}</Typography>
      </Grid>
      <Grid item xs={1}>
        <SwapHorizIcon />
      </Grid>
      <Grid item xs>
        <Typography>{right}</Typography>
      </Grid>
    </Grid>
  );
}


Row.propTypes = {
  left: PropTypes.string.isRequired,
  right: PropTypes.string.isRequired,
};

function MapConfirm({
  toggleMapDialogOpen, mapDialogOpen, activeEvent, activeExchangeEvent,
}) {
  const [mapEvent] = useMutation(MAP_EVENT_MUTATION);
  const { values } = useExchange();

  const confirm = async () => {
    await mapEvent({
      variables: { bgEventId: activeEvent.bgEventId, exchangeId: values.exchangeId, exchangeEventId: activeExchangeEvent.exchangeEventId },
    });
    toggleMapDialogOpen();
  };

  return (
    <Dialog
      open={mapDialogOpen}
      onClose={toggleMapDialogOpen}
    >
      <DialogTitle id="alert-dialog-title">Confirm mapping</DialogTitle>
      <DialogContent>
        {activeEvent && activeExchangeEvent
    && (
      <MapTable left="Uptick" right="Exchange">
        <Row left={activeEvent.event} right={activeExchangeEvent.event} />
        <Row left={activeEvent.venue} right={activeExchangeEvent.venue} />
        <Row
          left={dateformat(activeEvent.eventDate)}
          right={dateformat(activeExchangeEvent.eventDate)}
        />

      </MapTable>
    )}
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleMapDialogOpen} color="primary">
            Cancel (N)
        </Button>
        <Button onClick={confirm} color="primary" autoFocus>
            Confirm (Y)
        </Button>
      </DialogActions>
    </Dialog>
  );
}

MapConfirm.propTypes = {
  toggleMapDialogOpen: PropTypes.func.isRequired,
  mapDialogOpen: PropTypes.bool.isRequired,
  activeEvent: PropTypes.object.isRequired,
  activeExchangeEvent: PropTypes.object.isRequired,
};

export default MapConfirm;
