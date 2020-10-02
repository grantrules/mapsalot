import React from 'react';
import { mount } from 'enzyme';
import Event from '../../components/Event';

describe('event', () => {
  test('renders', () => {
    const wrapper = mount(<Event
      setSelected={() => {}}
      activeEventId={20}
      bgEventId={12}
      event="Bon Jovi"
      venue="Red Rocks"
      flagged={false}
      eventDate={`${new Date().getTime()}`}
    />); // mount/render/shallow when applicable
    expect(wrapper).toIncludeText('Bon Jovi');
  });
});
