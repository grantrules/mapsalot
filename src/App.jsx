import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ClientContext, GraphQLClient, useQuery } from 'graphql-hooks';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Auth from './components/Auth';
import Authorized from './components/Authorized';
import Header from './components/Header';
import Login from './components/Login';
import MapConfirm from './components/MapConfirm';
import ExchangePanel from './components/ExchangePanel';
import Uptick from './components/Uptick';
import EventContext from './context/EventContext';
import { ExchangeProvider } from './context/ExchangeContext';
import { UptickProvider } from './context/UptickContext';


const client = new GraphQLClient({
  url: '/graphql',
});


const VERIFY_QUERY = 'query Verify { verify }';

function App() {
  const { loading: vLoading, data: vData } = useQuery(VERIFY_QUERY);

  const [activeEvent, setActiveEvent] = useState(null);
  const [activeExchangeEvent, setActiveExchangeEvent] = useState(null);
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const [updateSearchEnabled, setUpdateSearchEnabled] = useState(true);

  const toggleMapDialogOpen = () => setMapDialogOpen(!mapDialogOpen);

  const hasActiveEvent = () => !!activeEvent;
  const getActiveEventId = () => activeEvent && activeEvent.bgEventId;
  const getActiveExchangeEventId = () => activeExchangeEvent && activeExchangeEvent.exchangeEventId;

  const toggleUpdateSearchEnabled = () => setUpdateSearchEnabled(!updateSearchEnabled);

  const context = {
    activeEvent,
    activeExchangeEvent,
    setActiveEvent,
    hasActiveEvent,
    getActiveEventId,
    setActiveExchangeEvent,
    getActiveExchangeEventId,
    mapDialogOpen,
    toggleMapDialogOpen,
    updateSearchEnabled,
    toggleUpdateSearchEnabled,
  };

  if (vLoading) return (<></>);
  if (vData) {
    return (
      <Auth activeSession={!!vData.verify}>
        <Authorized anonymous>
          <Login />
        </Authorized>
        <Authorized>
          <ExchangeProvider>
            <EventContext.Provider value={context}>
              <CssBaseline />

              <Header />

              {activeEvent && activeExchangeEvent
          && (
          <MapConfirm
            toggleMapDialogOpen={toggleMapDialogOpen}
            mapDialogOpen={mapDialogOpen}
            activeEvent={activeEvent}
            activeExchangeEvent={activeExchangeEvent}
          />
          )}


              <Grid container style={{ flex: '0 0 auto', display: 'flex', flexFlow: 'row nowrap' }}>
                <Grid item style={{ flex: 1 }}>
                  <Paper className="uptick" style={{ height: 'calc(100vh - 116px)', flex: '1 1 auto', display: 'flex', flexFlow: 'column' }}>
                    <UptickProvider>
                      <Uptick />
                    </UptickProvider>
                  </Paper>
                </Grid>

                <Grid item style={{ flex: 1 }}>
                  <Paper className="Exchange" style={{ height: 'calc(100vh - 116px)', flex: '1 1 auto', display: 'flex', flexFlow: 'column' }}>
                    <ExchangePanel />
                  </Paper>
                </Grid>
              </Grid>
            </EventContext.Provider>
          </ExchangeProvider>
        </Authorized>
      </Auth>
    );
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#026dfb',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#fe0103',
    },
    // error: will use the default color
  },
});


ReactDOM.render(
  <ClientContext.Provider value={client}>
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  </ClientContext.Provider>, document.getElementById('app'),
);
