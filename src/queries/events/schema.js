import {
  GraphQLList, GraphQLBoolean, GraphQLString,
} from 'graphql';

import { GraphQLInt } from 'graphql/type';
import EventType from './types';
import Event from './event';

const queries = {
  list: {
    type: GraphQLList(EventType),
    args: {
      limit: { type: GraphQLInt },
      offset: { type: GraphQLInt },
      order: { type: GraphQLString },
    },
    resolve: async (v, { limit, offset, order }, ctx) => Event.find(ctx, { limit, offset, order }),
  },
  find: {
    type: GraphQLList(EventType),
    args: {
      limit: { type: GraphQLInt },
      offset: { type: GraphQLInt },
      order: { type: GraphQLString },
      event: { type: GraphQLString },
      venue: { type: GraphQLString },
      dateFrom: { type: GraphQLString },
      dateTo: { type: GraphQLString },
    },
    resolve: async (v, {
      // eslint-disable-next-line camelcase
      limit, offset, order, event, venue, dateFrom, dateTo,
    }, ctx) => Event.find(ctx, {
      event,
      venue,
      dateFrom,
      dateTo,
      limit,
      offset,
      order,
    }),
  },
};

const mutations = {
  map: {
    type: GraphQLBoolean,
    args: {
      bgEventId: { type: GraphQLInt },
      exchangeEventId: { type: GraphQLInt },
      exchangeId: { type: GraphQLInt },
    },
    resolve: async (
      v,
      { bgEventId, exchangeEventId, exchangeId },
      ctx,
    ) => Event.map(ctx, bgEventId, exchangeEventId, exchangeId),
  },
  markUnresolved: {
    type: GraphQLBoolean,
    args: {
      bgEventId: { type: GraphQLInt },
      exchangeId: { type: GraphQLInt },
    },
    resolve: async (
      v,
      { bgEventId, exchangeId },
      ctx,
    ) => Event.markUnresolved(ctx, bgEventId, exchangeId),
  },
};

export default { queries, mutations };
