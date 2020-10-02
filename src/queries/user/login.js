import fetch from 'node-fetch';
import qs from '../../utils/qs';

export default (email, password) => fetch('https://adminpanel.brokergenius.net/adminpanel_api/login', {
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
  body: qs({ email, password }),
  method: 'POST',
}).then((res) => {
  const { headers } = res;
  const session = headers.has('set-cookie') && headers.get('set-cookie').match(/PHPSESSID=(.*?);/)[1];
  if (session) {
    return res.json().then((json) => json.success === 'Login Successfull' && session);
  }
  return false;
});
