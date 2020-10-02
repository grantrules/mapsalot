import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';

import events from './queries/events/schema';
import exchange from './queries/exchange/schema';
import user from './queries/user/schema';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...events.queries,
      ...exchange.queries,
      ...user.queries,
    },
  }),

  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      ...events.mutations,
    },
  }),
});
