import { Logout } from './components/Logout';
import React from 'react';
import { configure, shallow } from 'enzyme';
import sinon from 'sinon';
import axios from 'axios';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

let sandbox;
jest.mock('axios');

beforeEach(() => {
  sandbox = sinon.createSandbox();
});

afterEach(() => sandbox.restore());

it('constructor sets errorMessage to empty', () => {
  const component = new Logout();
  expect(component.state.errorMessage).toBe('');
});


it('componentDidMount sets token form localStorage', () => {
  const component = new Logout();
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }
  
  localStorage.setItem('token', 'toke123');
  component.componentDidMount();
  
  expect(component.state.token).toBe('toke123');
  expect(component.state.auth).toBe('Token toke123');
});

it('render displays logout link', () => {
  const wrapper = shallow(<Logout />);

  expect(wrapper.find('button').text()).toBe('logout');
});

it("clicking on logout calls logoutHelper", () => {
  const stub = sandbox.stub(Logout.prototype, 'performLogout');
  
  const wrapper = shallow(<Logout />);
  
  wrapper
    .find("button")
    .first()
    .simulate("click");
  
  expect(stub.calledOnce).toBe(true);
});

it('render does not render error', () => {
  const wrapper = shallow(<Logout />);

  expect(wrapper.text())
    .toEqual(expect.not.stringContaining("An error has occured"));
});

it('render does not contain logout if there is an error', () => {
  const wrapper = shallow(<Logout />);
  
  wrapper.setState({ errorMessage: '...details of error...' });

  expect(wrapper.text())
    .toEqual(expect.not.stringContaining("logout"));
});

it('render error message if there is an error', () => {
  const wrapper = shallow(<Logout />);
  
  wrapper.setState({ errorMessage: '...details of error...' });

  expect(wrapper.text())
    .toEqual(expect.stringContaining('Oops! An error has occured!'));

  expect(wrapper.text())
    .toEqual(expect.stringContaining('Error: ...details of error...'));
});

it('performLogout calls service to logout', () => {
  axios.request.mockImplementationOnce(() => Promise.resolve(''));
  
  const component = new Logout();
  component.state.auth = 'some auth info';
  component.performLogout();

  const config = {
    url: 'http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/logout/',
    method: 'post',
    headers: {"Authorization":component.state.auth, 'Content-Type':'application/json'}
}

  expect(axios.request).toHaveBeenCalledWith(config);
});

it('performLogout removes token from localstorage on success', () => {
  axios.request.mockImplementationOnce(() => Promise.resolve(''));
  localStorage.setItem('token', 'some previous stuff');
  localStorage.setItem('username', 'something');
  
  const component = new Logout();
  component.performLogout();

  return new Promise((resolve, reject) => {
    setImmediate(() => {
      expect(localStorage['token']).toBeUndefined();
      expect(localStorage['username']).toBeUndefined();
      resolve();
    });
  });
});

it('performLogout sets error message on failure', () => {
  axios.request.mockImplementationOnce(() => 
    new Promise((resolve, reject) => {
      throw new Error('great snakes');
    }));

  const component = new Logout();
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }

  component.performLogout();

  return new Promise((resolve, reject) => {
    setImmediate(() => {
      expect(component.state.errorMessage).toBe('great snakes');
      resolve();
    });
  });
});

it('performLogout does not remove token on failure', () => {
  axios.request.mockImplementationOnce(() => 
    new Promise((resolve, reject) => {
      throw new Error('great snakes');
    }));
  localStorage.setItem('token', 'some previous stuff');
  localStorage.setItem('username', 'something');

  const component = new Logout();
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }

  component.performLogout();

  return new Promise((resolve, reject) => {
    setImmediate(() => {
      expect(localStorage['token']).toBe('some previous stuff');
      expect(localStorage['username']).toBe('something');
      resolve();
    });
  });
});
