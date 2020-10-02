import {
  GraphQLList, GraphQLString,
} from 'graphql';

import { GraphQLInt } from 'graphql/type';
import ExchangeEventType from './types';
import findEvents from './stubhub';

const combineDates = (dateFrom, dateTo) => [dateFrom, dateTo].join(' TO ');

const queries = {
  findExchangeEvents: {
    type: GraphQLList(ExchangeEventType),
    args: {
      exchangeId: { type: GraphQLInt },
      limit: { type: GraphQLInt },
      offset: { type: GraphQLInt },
      order: { type: GraphQLString },
      event: { type: GraphQLString },
      venue: { type: GraphQLString },
      dateFrom: { type: GraphQLString },
      dateTo: { type: GraphQLString },
    },
    resolve: async (v, {
      limit, offset, order, event, venue, dateFrom, dateTo,
    }, ctx) => findEvents(ctx, {
      start: offset,
      rows: limit,
      venue,
      name: event,
      sort: order,
      dateLocal: combineDates(dateFrom, dateTo),
    }),
  },
};

export default { queries };
