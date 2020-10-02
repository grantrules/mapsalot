/* eslint-disable camelcase */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import FlagIcon from '@material-ui/icons/Flag';
import Tooltip from '@material-ui/core/Tooltip';
import { dateformat } from '../utils/date';
import MarkUnresolved from './MarkUnresolved';


const useStyles = makeStyles(() => ({

  root: {
    '&:hover': {
      backgroundColor: 'rgb(255, 142, 203)',
    },
    '&$selected': {
      backgroundColor: 'rgb(235, 42, 174)',
      '&:hover': {
        backgroundColor: 'rgb(255, 142, 203)',
      },
      '&:focus': {
        backgroundColor: 'rgb(171, 27, 125)',
      },
    },
    '&:focus': {
      backgroundColor: 'rgb(171, 27, 125)',
    },
  },
  selected: {

  },
}));

function Flagged() {
  return (
    <Tooltip title="Event has been flagged">
      <FlagIcon />
    </Tooltip>
  );
}

function Event({
  setSelected, activeEventId, bgEventId, event, venue, eventDate, flagged,
}) {
  const classes = useStyles();

  const handleClick = () => setSelected({
    bgEventId, event, venue, eventDate,
  });
  const selected = activeEventId === bgEventId;
  return (
    <ListItem selected={selected} classes={classes} button key={bgEventId} onClick={handleClick}>
      <ListItemText
        primary={(
          <>
            {event}
            {flagged && <Flagged />}
          </>
)}
        secondary={`${venue} || ${dateformat(eventDate)}`}
      />
      {selected
      && (
      <ListItemSecondaryAction>
        <MarkUnresolved bgEventId={bgEventId} />
      </ListItemSecondaryAction>
      )}
    </ListItem>
  );
}

Event.propTypes = {
  setSelected: PropTypes.func.isRequired,
  activeEventId: PropTypes.number,
  bgEventId: PropTypes.number.isRequired,
  event: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
  flagged: PropTypes.bool.isRequired,
};

Event.defaultProps = {
  activeEventId: -1,
};

export default Event;
