import React from 'react';
import {Button, Form} from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';



const Container = styled.div`
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  height: 100%;

`




export class Logout extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            token: localStorage.getItem('token'),
            auth: 'Token ' + localStorage.getItem('token'),
        }
    }


    logoutHelper = () => {
        axios.post('http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/logout/', this.state.auth)
        .catch(error => {
            console.log(error)
        })
        localStorage.removeItem('token')
    }

    render() {
        
        return (
            <React.Fragment>
                {/* <a href="/" onClick={this.logoutHelper}>logout</a> */}
                <span class="navbar-button"> <a class="btn dark" href="/" onClick={this.logoutHelper}>logout</a> </span>
            </React.Fragment>            
        );
    }
}

export default Logout;