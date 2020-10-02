import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GraphQLInt, GraphQLBoolean } from 'graphql/type';

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: {
    bgEventId: {
      type: GraphQLInt,
    },
    event: {
      type: GraphQLString,
    },
    venue: {
      type: GraphQLString,
    },
    eventDate: {
      type: GraphQLString,
    },
    posName: {
      type: GraphQLString,
    },
    flagged: {
      type: GraphQLBoolean,
    },
  },
});

export default EventType;
