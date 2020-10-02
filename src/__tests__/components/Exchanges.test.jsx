import React from 'react';
import { shallow } from 'enzyme';
import Exchanges from '../../components/Exchanges';

jest.mock('../../context/ExchangeContext');

describe('exchanges', () => {
  /*
  test('renders', () => {
    const wrapper = mount(<SearchInput
      delayedChange={() => {}}
      label="Yup"
      value="Hey"
      delay="1000"
    />); // mount/render/shallow when applicable
    // expect something
  });
  */
  test('renders', () => {
    const wrapper = shallow(<Exchanges />);
    expect(wrapper).toIncludeText('StubHub');
  });
});
