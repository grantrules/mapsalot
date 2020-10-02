import {
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';

import login from './login';
import info from './info';
import { auth } from '../../utils/authorized';

const queries = {
  login: {
    type: GraphQLBoolean,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve:
      async (_v, { email, password }, ctx) => login(email, password)
        .then((session) => {
          if (!session) {
            return false;
          }

          ctx.session.session = session;
          return info(session).then((user) => {
            ctx.session.user = user;
            return true;
          });
        }),
  },
  verify: {
    type: GraphQLBoolean,
    resolve: (_v, _args, ctx) => !!auth(() => true)(ctx),
  },
  logout: {
    type: GraphQLBoolean,
    resolve: (_v, _args, ctx) => { ctx.session.destroy(); return true; },
  },
};

export default { queries };
