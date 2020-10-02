import { yesterday, twoyears } from '../../utils/date';

const useExchange = () => {
  const values = {
    event: '',
    venue: '',
    dateFrom: yesterday(),
    dateTo: twoyears(),
    order: 'eventDateLocal asc',
    exchangeId: 1,
  };
  const update = () => {};
  const updateSearchValue = () => () => {};
  const updateExchangeId = () => {};

  return {
    updateSearchValue,
    updateExchangeId,
    update,
    values,
  };
};


export { useExchange };
