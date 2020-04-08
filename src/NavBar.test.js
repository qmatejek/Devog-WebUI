import { NavBar } from './components/NavBar';
import React from 'react';
import { shallow, mount } from 'enzyme';

it("renders correctly", () => {
    const wrapper = shallow(
      <NavBar />
    );
  
    expect(wrapper).toMatchSnapshot();
  });

it("renders logout button correctly", () => {
  const wrapper = mount(
    <NavBar />
  );

  wrapper.setState({token: "toke123"});
  wrapper.update();
  
  expect(wrapper).toMatchSnapshot();
})