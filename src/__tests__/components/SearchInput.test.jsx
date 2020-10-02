import React from 'react';
import { mount } from 'enzyme';
import SearchInput from '../../components/SearchInput';

describe('search input', () => {
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

  test('calls delayedChange after delay', () => {
    jest.useFakeTimers();
    const cb = jest.fn();
    const wrapper = mount(<SearchInput
      delayedChange={cb}
      label="Yup"
      value="Hey"
      delay={1000}
    />);
    const input = wrapper.find('input');

    input.simulate('focus');
    input.simulate('change', { target: { value: 'Changed' } });
    expect(setTimeout).toHaveBeenCalledTimes(2); // not sure where that first one comes from??
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    jest.runAllTimers();
    expect(cb).toHaveBeenCalled();
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenLastCalledWith('Changed');
  });
});
