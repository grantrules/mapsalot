import fetch from 'node-fetch';

export default (session) => fetch('https://adminpanel.brokergenius.net/adminpanel_api/verify?silent=true', {
  credentials: 'include',
  headers: {
    cookie: `PHPSESSID=${session}`,
  },
  method: 'GET',
}).then((res) => res.json());
