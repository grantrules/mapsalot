import React, { useContext } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { useManualQuery } from 'graphql-hooks';
import Auth from '../../components/Auth';
import Authorized from '../../components/Authorized';
import AuthContext from '../../context/AuthContext';


jest.mock('graphql-hooks', () => ({
  useManualQuery: jest.fn(),
}));

const LoginTest = () => {
  const { login } = useContext(AuthContext);
  return (<button type="button" onClick={() => login({ email: 'grant', password: 'grant' })}>login</button>);
};
function holup(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
describe('auth', () => {
  /*
  it('should load children', () => {
    useManualQuery.mockImplementation(() => [() => true]);
    const wrapper = mount(<Auth activeSession={false}><LoginTest /></Auth>);
    expect(wrapper).toContainMatchingElement('button');
  });
*/
  it('should load log in after click', async () => {
    const login = jest.fn();
    login.mockReturnValue({ data: { login: true } });

    const useManualQueryMock = () => [login];

    useManualQuery.mockImplementation(useManualQueryMock);
    const wrapper = mount(
      <Auth activeSession={false}>
        <LoginTest />
        <Authorized anonymous={false}>hi</Authorized>
      </Auth>,
    );
    act(() => { wrapper.find('button').simulate('click'); });
    await holup(1500);
    act(() => { wrapper.update(); });
    expect(wrapper).toIncludeText('hi');
  });
/*
  it('should log in with hook', () => {
    useManualQuery.mockImplementation(() => [() => true]);
    const wrapper = mount(<Auth activeSession={false}><Authorized anonymous={false}>hi</Authorized></Auth>);
    expect(wrapper).toIncludeText('hi');
  });

  it('should not log ink with hook', () => {
    useManualQuery.mockImplementation(() => [() => false]);
    const wrapper = mount(<Auth activeSession={false}><Authorized anonymous={false}>hi</Authorized></Auth>);
    expect(wrapper).not.toIncludeText('hi');
  });
  */
});
