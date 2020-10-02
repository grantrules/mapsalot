const unauthorized = () => { throw new Error('Unauthorized'); };

const authWithUser = (func) => ({ session }, ...args) => ((session
    && session.user) ? func(session.user, ...args) : unauthorized());

const auth = (func) => authWithUser((_, ...args) => func(...args));


export { auth, authWithUser };
