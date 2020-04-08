import { NoMatch } from './NoMatch';
import React from 'react';
import { shallow, render } from 'enzyme';

it("renders correctly", () => {
    const wrapper = shallow(
      <NoMatch />
    );
  
    expect(wrapper).toMatchSnapshot();
  });