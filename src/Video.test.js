import { Video } from './components/Video';
import { Login } from './Login';
import React from 'react';
import { shallow, render, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { cleanup, fireEvent } from '@testing-library/react';
import { Redirect } from "react-router-dom";
import { MemoryRouter as Router } from 'react-router-dom';
configure({ adapter: new Adapter() });

let sandbox;
jest.mock('axios');

beforeEach(() => {
  sandbox = sinon.createSandbox();
  window.alert = sandbox.stub();
  
  React.createRef = sandbox.stub()
    .returns({ current: { setAttribute: sandbox.stub() }});
});

afterEach(() => sandbox.restore());

it("renders correctly", () => {
    const wrapper = shallow(
      <Video history={[]} />
    );
  
    expect(wrapper).toMatchSnapshot();
  });
 

it("fetched live streams using fetchLvSubmitHandler", () =>{
  axios.get.mockImplementationOnce(() => Promise.resolve(''));

  const component = new Video();
  
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }

  const event = { preventDefault() {}, stopPropagation() {} };

  component.setState({auth: "auth123"});

  localStorage.setItem('username', 'sdp');
  component.fetchLvSubmitHandler(event);
    

  let url = "http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/sdp/live";
  const headers = {headers: {"authorization":"auth123"}};

  expect(axios.get).toHaveBeenCalledWith(url, headers);
})

it("fetched uploaded videos using fetchUpSubmitHandler", () =>{

  const data = ['1', '2', '3'];

  axios.get.mockImplementationOnce(() => Promise.resolve(data));

  const component = new Video();
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }

  const event = { preventDefault() {}, stopPropagation() {} };

  component.setState({auth: "auth123"});

  localStorage.setItem('username', 'sdp');

  component.fetchUpSubmitHandler(event);
  

  let url = 'http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/sdp';
  const headers = {headers: {"authorization":"auth123"}};

  expect(axios.get).toHaveBeenCalledWith(url, headers);
});

 it('fetchUpSubmitHandler sets error message on failure', () => {
   axios.get.mockImplementationOnce(() => 
     new Promise((resolve, reject) => {
       throw new Error('great snakes');
     }));

  const component = new Video();
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }

  const event = { preventDefault() {}, stopPropagation() {} };
  component.fetchUpSubmitHandler(event)

   return new Promise((resolve, reject) => {
     setImmediate(() => {
       expect(component.state.errorMessage).toBe('great snakes');
       resolve();
     });
   });
 });

it('fetchLvSubmitHandler sets error message on failure', () => {
  axios.get.mockImplementationOnce(() => 
    new Promise((resolve, reject) => {
      throw new Error('great snakes');
    }));

  const component = new Video();
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }

  const event = { preventDefault() {}, stopPropagation() {} };

  component.fetchLvSubmitHandler(event);

  return new Promise((resolve, reject) => {
    setImmediate(() => {
      expect(component.state.errorMessage).toBe('great snakes');
      resolve();
    });
  });
});

it("editSubmitHandler makes API call", ()=> {
  axios.put.mockImplementationOnce(() => Promise.resolve(''));

  sinon.stub(window.location, 'reload');

  const component = new Video();
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }

  const e = {preventDefault() {}, stopPropagation() {}, target:[{value:"test"},]};

  localStorage.setItem('username','sdp');

  component.setState({auth:"auth123"})

  component.editSubmitHandler(e, "00");

  let url = "http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/sdp/00";


  expect(axios.put).toHaveBeenCalledWith(url, {"name":"test"}, {headers: {"Authorization":"auth123"}});

})

it("editSubmitHandler sets error message on failure", ()=> {
  axios.put.mockImplementationOnce(() => 
    new Promise((resolve, reject) => {
      throw new Error('great snakes');
    }));

  const component = new Video();
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }

  const e = {preventDefault() {}, stopPropagation() {}, target:[{value:"test"},]};

  localStorage.setItem('username','sdp');

  component.setState({auth:"auth123"})

  component.editSubmitHandler(e, "00");

  return new Promise((resolve, reject) => {
    setImmediate(() => {
      expect(component.state.errorMessage).toBe('great snakes');
      resolve();
    });
  });

})

it("editLiveSubmitHandler makes API call", ()=> {
  axios.put.mockImplementationOnce(() => Promise.resolve(''));

  const component = new Video();
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }

  const e = {preventDefault() {}, stopPropagation() {}, target:[{value:"test"},]};

  localStorage.setItem('username','sdp');

  component.setState({auth:"auth123"})

  component.editLiveSubmitHandler(e, "00");

  let url = "http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/sdp/live/00";

  expect(axios.put).toHaveBeenCalledWith(url, {"name":"test"}, {headers: {"Authorization":"auth123"}});

});

it("editLiveSubmitHandler sets errorMessage on failure", ()=> {
  axios.put.mockImplementationOnce(() => 
    new Promise((resolve, reject) => {
      throw new Error('great snakes');
    }));

  const component = new Video();
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }

  const e = {preventDefault() {}, stopPropagation() {}, target:[{value:"test"},]};

  localStorage.setItem('username','sdp');

  component.setState({auth:"auth123"})

  component.editLiveSubmitHandler(e, "00");

  return new Promise((resolve, reject) => {
    setImmediate(() => {
      expect(component.state.errorMessage).toBe('great snakes');
      resolve();
    });
  });

});

it("delSubmitHandler makes API call", ()=>{
  axios.delete.mockImplementationOnce(() => Promise.resolve(''));

  const component = new Video();
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }

  const e = {preventDefault() {}, stopPropagation() {}};

  localStorage.setItem('username','sdp');

  component.setState({auth:"auth123"})

  component.delSubmitHandler(e, "00");

  let url = "http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/sdp/00";

  expect(axios.delete).toHaveBeenCalledWith(url, {headers: {"Authorization":"auth123"}});
})

it("delSubmitHandler sets errorMessage on failure", ()=>{
  axios.delete.mockImplementationOnce(() => 
    new Promise((resolve, reject) => {
      throw new Error('great snakes');
    }));

  const component = new Video();
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }

  const e = {preventDefault() {}, stopPropagation() {}};

  localStorage.setItem('username','sdp');

  component.setState({auth:"auth123"})

  component.delSubmitHandler(e, "00");

  return new Promise((resolve, reject) => {
    setImmediate(() => {
      expect(component.state.errorMessage).toBe('great snakes');
      resolve();
    });
  });
})

it("delLiveSubmitHandler makes API call", ()=>{
  axios.delete.mockImplementationOnce(() => Promise.resolve(''));

  const component = new Video();
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }

  const e = {preventDefault() {}, stopPropagation() {}};

  localStorage.setItem('username','sdp');

  component.setState({auth:"auth123"});

  localStorage.setItem('username','sdp');

  component.delLiveSubmitHandler(e, "00");

  let url = "http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/sdp/live/00";

  expect(axios.delete).toHaveBeenCalledWith(url, {headers: {"Authorization":"auth123"}});
});

it("delLiveSubmitHandler sets errorMessage on failure", ()=>{
  axios.delete.mockImplementationOnce(() => 
    new Promise((resolve, reject) => {
      throw new Error('great snakes');
    }));

  const component = new Video();
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }

  const e = {preventDefault() {}, stopPropagation() {}};

  localStorage.setItem('username','sdp');

  component.setState({auth:"auth123"});

  localStorage.setItem('username','sdp');

  component.delLiveSubmitHandler(e, "00");

  return new Promise((resolve, reject) => {
    setImmediate(() => {
      expect(component.state.errorMessage).toBe('great snakes');
      resolve();
    });
  });
});

it("addLiveSubmitHandler makes API call", ()=>{
  axios.post.mockImplementationOnce(() => Promise.resolve(''));

  const component = new Video();
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }

  const e = {preventDefault() {}, stopPropagation() {}};

  component.setState({streamName: "test", streamURL: "testURL", auth:"auth123"});

  localStorage.setItem('username','sdp');
  component.addLiveSubmitHandler(e);

  const formData = new FormData();
        formData.append('name','test');
        formData.append('link','testURL')

  const headers = {headers: {"Authorization":"auth123", 'Content-Type':'application/json'}};      

  let url = "http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/sdp/live";

  expect(axios.post).toHaveBeenCalledWith(url, formData, headers);
});

it("addLiveSubmitHandler sets errorMessage on failure", ()=>{
  axios.post.mockImplementationOnce(() => 
    new Promise((resolve, reject) => {
      throw new Error('great snakes');
    }));

  const component = new Video();
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }

  const e = {preventDefault() {}, stopPropagation() {}};

  component.setState({streamName: "test", streamURL: "testURL", auth:"auth123"});

  localStorage.setItem('username','sdp');
  component.addLiveSubmitHandler(e);

  return new Promise((resolve, reject) => {
    setImmediate(() => {
      expect(component.state.errorMessage).toBe('great snakes');
      resolve();
    });
  });
});

it("fileButtonHandler makes API call", () =>{
  axios.post.mockImplementationOnce(() => Promise.resolve(''));

  const component = new Video();
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }

  const e = {preventDefault() {}, stopPropagation() {}, target:{files:[{name: "test"}]}};


  component.setState({auth:"auth123"});

  localStorage.setItem('username','sdp')
  component.fileButtonHandler(e);

  const formData = new FormData();
        formData.append('name', e.target.files[0].name);
        formData.append('location', e.target.files[0]);

  const headers = {headers: {"Authorization":"auth123", 'Content-Type':'application/json'}};      

  let url = "http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/sdp";

  expect(axios.post).toHaveBeenCalledWith(url, formData, headers);
});

it("fileButtonHandler sets errorMessage on failure", () =>{
  axios.post.mockImplementationOnce(() => 
    new Promise((resolve, reject) => {
      throw new Error('great snakes');
    }));

  const component = new Video();
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }

  const e = {preventDefault() {}, stopPropagation() {}, target:{files:[{name: "test"}]}};


  component.setState({auth:"auth123"});

  localStorage.setItem('username','sdp')
  component.fileButtonHandler(e);

  return new Promise((resolve, reject) => {
    setImmediate(() => {
      expect(component.state.errorMessage).toBe('great snakes');
      resolve();
    });
  });
});

it("changeHandler handles change", () => {

  const component = new Video();
  component.setState = function(state) {
    this.state = {...this.state, ...state};
  }

  const e = {target:{name: "streamName", value: "test"}};

  component.changeHandler(e);

  expect(component.state.streamName).toBe("test");
});

it('render error message if there is an error', () => {
  sinon.stub(window.location, 'replace');

  const wrapper = mount(<Video />);
  
  wrapper.instance().setState({ errorMessage: '...details of error...' });

  wrapper.update();

  expect(wrapper.text())
    .toEqual(expect.stringContaining('Oops! An error has occured!'));

  expect(wrapper.text())
    .toEqual(expect.stringContaining('Error: ...details of error...'));
});

// it('render failed to render message if there is nothing to render', () => {
//   const wrapper = shallow(<Video />);

//   wrapper.setState({token: "auth123"})

//   expect(wrapper.text())
//     .toEqual(expect.stringContaining('Oops! Nothing was rendered...'));
// });

it('render not logged in if there is an error', () => {
  //sinon.stub(window.location, 'replace');

  const wrapper = mount(<Video />);

  expect(wrapper.text())
    .toEqual(expect.stringContaining('You must be logged in to view this page!'));

});

// it('fetchUpSubmitHandler fetches videos', () =>{
//   const wrapper = mount(<Video />);

//   wrapper.find("button")
//         .first()
//         .simulate("click")

//   expect(wrapper.state("videos")).not.toBe(null);      
// });