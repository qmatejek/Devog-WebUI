import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';

export const NavBar = () =>(
    <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Behaviorics</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
            <Nav.Item><Nav.Link href="/upload">Upload</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/login">Login</Nav.Link></Nav.Item>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)