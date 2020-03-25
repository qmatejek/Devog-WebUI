import React from 'react';
import {Button, Form} from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';


export class Logout extends React.Component {
    constructor(props) {
        super(props);
        
        //Retrieves token to be used with logout API.
        this.state = {
            token: localStorage.getItem('token'),
            auth: 'Token ' + localStorage.getItem('token'),
        }
    }

    //Handles the pressing of the logout button.
    logoutHelper = () => {

        //Makes POST request to the API.
        axios.post('http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/logout/', this.state.auth)
        .catch(error => {
            console.log(error)
        })

        //Removes user's name and token now that they have been logged out.
        localStorage.removeItem('token')
        localStorage.removeItem('username')
    }

    render() {
        
        return (
            
            <React.Fragment>
                {/* Displays the logout button */}
                <span class="navbar-button"> <a class="btn dark" href="/" onClick={this.logoutHelper}>logout</a> </span>
            </React.Fragment>            
        );
    }
}

export default Logout;