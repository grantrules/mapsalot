import qs from '../../utils/qs';
import { auth } from '../../utils/authorized';


// https://brokergenius.atlassian.net/wiki/spaces/BF/pages/65817627/Stubhub+API+Documentation?preview=/65817627/65817743/API%20Reference%20-%20Event.pdf
const fetch = require('node-fetch');

/*
curl 'https://www.stubhub.com/bfx/api/search/suggest/v3?term=knicks&sort=popularity%20desc%2C%20eventDateLocal%20asc%2C&perfRows=5&entityList=event%2Cperformer%2Cvenue&minAvailableTickets=0&includeNoneventEntities=true&shstore=1&point=40.76955%2C-74.02042&radius=200&lang=true&urgencyMessaging=true&timeZoneOffsetInMinutes=240&withEventCount=true&enablePopular=false' -H 'accept: application/json'
*/

// https://developer.stubhub.com/searchevent/apis/get/search/events/v3


const searchUrl = process.env.STUBHUB_SEARCH_URL;
const loginUrl = process.env.STUBHUB_LOGIN_URL;

const login = ({ user, password }) => {
  const atob = (str) => Buffer.from(str, 'binary').toString('base64');
  const tokens = {
    key: process.env.STUBHUB_KEY,
    secret: process.env.STUBHUB_SECRET,
  };
  const authKey = atob(`${tokens.key}:${tokens.secret}`);
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${authKey}`,
  };
  const body = `grant_type=password&username=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}`;

  return fetch(loginUrl, {
    body,
    headers,
    method: 'POST',
  })
    .then((response) => response.json())
    .then((json) => json.access_token);
};

class KeyStore {
  async getKey() {
    if (!this.keyPromise) {
      this.keyPromise = await login({
        user: process.env.STUBHUB_USER,
        password: process.env.STUBHUB_PASSWORD,
      });
    }
    const data = this.keyPromise;
    /*
    if (!this.stillValid(data)) {
      this.invalidate();
      return this.getKey();
    }
*/
    return data;
  }

  invalidate() {
    this.keyPromise = null;
  }

/*
  stillValid(data) {
    // check expiration or whatever
  }
  */
}

const keys = new KeyStore();

const transform = ({
  id, name, eventDateLocal, venue,
}) => ({
  exchangeEventId: id,
  eventDate: Date.parse(eventDateLocal),
  event: name,
  venue: `${venue.name}, ${venue.city}, ${venue.state}`,
});

const findEvents = auth(async (fields) => fetch(`${searchUrl}?${qs(fields)}`, {
  headers: { Authorization: `Bearer ${await keys.getKey()}` },
}).then((res) => res.json())
  .then((json) => json.events)
  .then((events) => events.map(transform)));

export default findEvents;

/*

url: https://api.brokergenius.com/v1/exchange/over_write_event

v4.0: app\libraries\Pricegenius\OverWriteEvent.php

public function save_event_central_database($form_data)
    {

        if (!empty($this->acc_type)) {
            $pos_event_id = $form_data['local_event_id'];

            $product  = explode('-', $this->product_name);
            $pos_name = $product[1];
            $resource = "over_write_event";
            $url      = $this->url . $resource;

            $this->request_options['body'] = [
                'pos_event_id'      => $pos_event_id,
                'exchange_event_id' => $this->get_stubhub_id_by_url($form_data['stubhub_url']),
                'event_date'        => $form_data['date'],
                'event_time'        => '',
                'venue_name'        => $form_data['venue_name'],
                'event_name'        => $form_data['event_name'],
                'pos_name'          => $pos_name,
                'acc_type'          => $this->acc_type,
                'user'              => $this->name,
                'approve_status'    => $form_data['approve_status'],
                'source'            => "manual",
                'exchange_id'       => $form_data['exchange_id']
            ];

            $resp = $this->guzzle->post($url, $this->request_options);
            $resp = $resp->json();
            $this->cache_library->deleteCacheEventmetaResponse($pos_event_id);
//                sleep(1.3);
            return $resp;
        }
        return false;
    }
    */
