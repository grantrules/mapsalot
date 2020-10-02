import { format, subDays, addDays } from 'date-fns';

const yesterday = () => subDays(new Date(), 1);
const twoyears = () => addDays(new Date(), 730);
const dateformat = (seconds, fmt = 'E MMM d, yyyy h:mm a') => format(new Date(Number(seconds)), fmt);

export { yesterday, twoyears, dateformat };
