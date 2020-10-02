/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useQuery } from 'graphql-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import { format } from 'date-fns';
import EventContext from '../context/EventContext';
import Error from './Error';
import ExchangeEvent from './ExchangeEvent';
import SearchInput from './SearchInput';
import { useExchange } from '../context/ExchangeContext';

const SEARCH_QUERY = `query findExchangeEvents($exchangeId: Int, $offset: Int, $event: String, $venue: String, $dateFrom: String, $dateTo: String, $order: String) {
   findExchangeEvents(exchangeId: $exchangeId, offset: $offset, event: $event, venue: $venue, dateFrom: $dateFrom, dateTo: $dateTo, order: $order){
      exchangeEventId, event, venue, eventDate
    }
  }`;

function ExchangeSearchFields() {
  const { values, updateSearchValue } = useExchange();


  return (
    <>
      <SearchInput
        label="Event Name"
        value={values.event}
        delayedChange={updateSearchValue('event')}
        delay={200}
      />
      <SearchInput
        label="Venue"
        value={values.venue}
        delayedChange={updateSearchValue('venue')}
        delay={200}
      />
      <KeyboardDatePicker
        autoOk
        disableToolbar
        variant="inline"
        format="yyyy-MM-dd"
        margin="normal"
        id="date-from"
        label="Date from"
        value={values.dateFrom}
        onChange={updateSearchValue('dateFrom')}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
      <KeyboardDatePicker
        autoOk
        disableToolbar
        variant="inline"
        format="yyyy-MM-dd"
        margin="normal"
        id="date-to"
        label="Date to"
        value={values.dateTo}
        onChange={updateSearchValue('dateTo')}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </>
  );
}

function ExchangeSearchResults() {
  const {
    hasActiveEvent,
    activeExchangeEvent,
    setActiveExchangeEvent,
    getActiveExchangeEventId,
    toggleMapDialogOpen,
  } = useContext(EventContext);

  const { values } = useExchange();

  const { loading, error, data } = useQuery(SEARCH_QUERY, {
    variables: {
      exchangeId: values.exchangeId,
      offset: 0,
      event: values.event,
      venue: values.venue,
      dateFrom: values.dateFrom && format(values.dateFrom, 'yyyy-MM-dd'),
      dateTo: values.dateTo && format(values.dateTo, 'yyyy-MM-dd'),
      order: values.order,
    },
  });

  if (loading) return (<CircularProgress />);
  if (error) return (<Error />);
  if (data && data.findExchangeEvents) {
    return data.findExchangeEvents.map(
      (event) => (
        <ExchangeEvent
          getActiveExchangeEventId={getActiveExchangeEventId}
          hasActiveEvent={hasActiveEvent}
          activeExchangeEvent={activeExchangeEvent}
          toggleMapDialogOpen={toggleMapDialogOpen}
          setActiveExchangeEvent={setActiveExchangeEvent}
          key={event.exchangeEventId}
          {...event}
        />
      ),
    );
  }
}

export default function Exchange() {
  return (
    <>
      <div style={{ flexFlow: '0 0 auto' }}>
        <ExchangeSearchFields />
      </div>
      <div
        style={{ flexFlow: '1 0 auto', overflow: 'auto' }}
      >
        <ExchangeSearchResults />
      </div>
    </>
  );
}
