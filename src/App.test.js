import React from 'react';
//import { render } from '@testing-library/react';
import App from './App';
import { shallow, render } from 'enzyme';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it("renders correctly", () => {
  const wrapper = shallow(
    <App />
  );

  expect(wrapper).toMatchSnapshot();
});