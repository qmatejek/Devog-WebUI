import React, { Component } from 'react';
import { Logout } from './Logout';
import '../index.css';



export class NavBar extends Component {

    state = {
        token: localStorage.getItem('token'),
    }

    

    render(){

        //This piece of code with the button variable allows me to do conditional rendering of the login/logout buttons.
        //If token is null, then user is not logged in and needs to see the login button. If there is a token, then he/she needs the logout.
        let button;

        if(this.state.token == null){
            button = <span class="navbar-button"><a class="btn dark" href="/login" >login</a></span>;
        }
        else{
            button = <Logout/>;
        }

        

        return(
            
                <div class="navbar-content">
                    <span class="navbar-logo"><a href="/">Home</a></span>
                    <span class="navbar-button">{ button }</span>
                    <span class="navbar-item"><a href="">About</a></span>
                    <span class="navbar-item"><a href="">Contact</a></span>
                    <span class="navbar-item"><a href="">Devog</a></span>
                    <span class="navbar-item"><a href='/video'>Videos</a></span>
                </div>
            
        );
    }
}