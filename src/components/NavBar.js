import React, { Component } from 'react';
import { Logout } from './Logout';
import '../index.css';



export class NavBar extends Component {

    state = {
        token: localStorage.getItem('token'),
    }

    

    render(){

        //This piece of code with the button variable allows me to do conditional rendering of the login/logout buttons and the videos link.
        //If token is null, then user is not logged in and needs to see the login button. If there is a token, then he/she needs the logout.
        let button;
        let vidLink;

        if(this.state.token == null){
            button = <span className="navbar-button"><a className="btn dark" href="/login" >login</a></span>;
            vidLink = "";
        }
        else{
            button = <Logout/>;
            vidLink = <span className="navbar-item"><a href='/video'>Videos</a></span>
        }

        

        return(
            
                <div className="navbar-content">
                    <span className="navbar-logo"><a href="/">Home</a></span>
                    {button}
                    <span className="navbar-item"><a href="">About</a></span>
                    <span className="navbar-item"><a href="">Contact</a></span>
                    <span className="navbar-item"><a href="">Devog</a></span>
                    {vidLink}
                </div>
            
        );
    }
}