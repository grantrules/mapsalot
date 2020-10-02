import React from 'react';

export default React.createContext({
  activeEvent: null,
  activeExchangeEvent: null,
  setActiveEvent: () => {},
  hasActiveEvent: () => {},
  getActiveEventId: () => {},
  setActiveExchangeEvent: () => {},
  getActiveExchangeEventId: () => {},
  updateSearchEnabled: true,
  toggleUpdateSearchEnabled: () => {},
  updateSearch: () => {},
});
