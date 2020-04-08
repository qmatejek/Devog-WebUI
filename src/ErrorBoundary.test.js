import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import React from 'react';
import { shallow, mount } from 'enzyme';

it("renders correctly", () => {

    const Sample = () => null;

    const wrapper = shallow(
      <ErrorBoundary>
          <Sample />
      </ErrorBoundary>
    );
  
    expect(wrapper).toMatchSnapshot();
  });

it('componentDidMount sets error and errorInfo', () => {
    
  const Sample = () => null;

  const wrapper = mount(
    <ErrorBoundary>
        <Sample />
    </ErrorBoundary>
  );

  wrapper.instance().componentDidCatch("error", "This is an error");
  wrapper.update();

  expect(wrapper.state('hasError')).toBeTruthy();
  expect(wrapper.state('error')).toBe("error");
  expect(wrapper.state('errorInfo')).toBe("This is an error");
});  