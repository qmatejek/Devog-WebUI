import React, { Component } from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import { Logout } from './Logout';
//import "./styles.css";
import '../index.css';



export class NavBar extends Component {
    // <Navbar expand="lg" bg="dark" variant="dark">
    //     <Navbar.Brand href="/">Behaviorics</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    //     <Navbar.Collapse id="basic-navbar-nav">
    //         <Nav className="ml-auto">
    //         <Nav.Item><Nav.Link href="/upload">Upload</Nav.Link></Nav.Item>
    //             <Nav.Item><Nav.Link href="/login">Login</Nav.Link></Nav.Item>
    //         </Nav>
    //     </Navbar.Collapse>
    // </Navbar>

    state = {
        token: localStorage.getItem('token'),
    }

    

    render(){

        let button;

        if(this.state.token == null){
            button = <span class="navbar-button"><a class="btn dark" href="/login" >login</a></span>;
        }
        else{
            button = <Logout/>;
        }

        return(
            <React.Fragment>
                <div class="navbar">
                    <div class="navbar-content">
                        <span class="navbar-logo"><a href="/">Home</a></span>
                        {/* <span class="navbar-button"><a class="btn dark" href="/login">login</a></span> */}
                        <span class="navbar-button">{ button }</span>
                        <span class="navbar-item">About</span>
                        <span class="navbar-item">Contact</span>
                        <span class="navbar-item">Devog</span>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}