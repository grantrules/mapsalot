import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { yesterday, twoyears } from '../utils/date';

const UptickContext = React.createContext([{}, () => {}]);

const UptickProvider = ({ children }) => {
  const [state, setState] = useState(
    {
      event: '',
      venue: '',
      dateFrom: yesterday(),
      dateTo: twoyears(),
      order: 'eventDateLocal asc', // date asc and id asc don't work :/
    },
  );

  return (
    <UptickContext.Provider value={[state, setState]}>
      {children}
    </UptickContext.Provider>
  );
};

UptickProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useUptick = () => {
  const [values, setValues] = useContext(UptickContext);

  const updateSearchValue = (name) => (val) => setValues({ ...values, [name]: val });
  const update = (newValues) => setValues({
    ...values,
    ...newValues,
  });

  return {
    updateSearchValue,
    update,
    values,
  };
};

export { UptickContext, UptickProvider, useUptick };
