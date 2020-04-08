import { Home } from './Home';
import React from 'react';
import { shallow, render } from 'enzyme';

it("renders correctly", () => {
    const wrapper = shallow(
      <Home />
    );
  
    expect(wrapper).toMatchSnapshot();
  });