import ReactDOM from 'react-dom';
import React from 'react';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import App from './App';
import index from './index'

jest.mock('react-dom', ()=> ({render: jest.fn()}))

it('renders without crashing', () => {
    expect(
      JSON.stringify(
        Object.assign({}, index, { _reactInternalInstance: 'censored' }),
      ),
    ).toMatchSnapshot();
  });