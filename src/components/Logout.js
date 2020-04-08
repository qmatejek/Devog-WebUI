import React from 'react';
import axios from 'axios';

export class Logout extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      errorMessage: '',
      token: localStorage['token'],
      auth: `Token ${localStorage['token']}`,
    };
  }

  componentDidMount() {
    this.setState({
      token: localStorage['token'],
      auth: `Token ${localStorage['token']}`
    });
  }
  
  performLogout() {

    const config = {
        url: 'http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/logout/',
        method: 'post',
        headers: {"Authorization":`${this.state.auth}`, 'Content-Type':'application/json'}
    }
      
    axios.request(config)
        .then(() => {
            this.removeItemsFromLocalStorage();
            window.location.replace("/");
        })
        .catch(error => {
            this.setState({ errorMessage: error.message });
        });
                
  }
  
  removeItemsFromLocalStorage() {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }
  
  render() {
    if(this.state.errorMessage !== '') {
      return <div>
        <br/><br/>
        <h1>Oops! An error has occured!</h1>
        <h3>Error: {this.state.errorMessage}</h3>
      </div>;
    }
    else{
        return <React.Fragment>
        <span className="navbar-button">
          <button className="btn dark"
            onClick={ () => this.performLogout() }>logout</button>
        </span>
      </React.Fragment>;        
    }

    
  }
}

export default Logout;