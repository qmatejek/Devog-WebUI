import React, {Redirect} from 'react';
import {Button, Form} from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { Link, withRouter, BrowserRouter } from "react-router-dom";



const Container = styled.div`
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  height: 100%;
  padding-top: 100px;

`




export class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username:'',
            password:'',
        }

    }

    

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {

        e.preventDefault()

        //Makes POST request to the API.
        axios.post('http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/login/', this.state)
        .then(Response => {

            //Stores token for use with other components
            localStorage.setItem('token', Response.data.token)

            //Stores username for use with other components
            if(this.state.username != null){
                localStorage.setItem('username', this.state.username)
            }

            this.props.history.push('/') //Sends user to the home page.
            window.location.reload(false); //Forces refresh to reflect change in login status. (login/logout button)

        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        const {username, password} = this.state

        return (
            <Container>

                <Form className="login-form" onSubmit={this.submitHandler}>
                    <h2 className="text-center">Sign in</h2>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" name="username" value = {username} onChange={this.changeHandler}/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" placeholder="Password" name="password" value = {password} onChange={this.changeHandler}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>

                    <Button variant="dark" type="submit" size="lg" block>
                        Log in
                    </Button>
                    
                </Form>

            </Container>  
                     
        );

        
    }
}

export default Login;