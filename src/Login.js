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
  padding-top: 100px;

`




export class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username:'',
            password:'',
            errorMessage: '',
        }
        
        this.submitHandler = this.submitHandler.bind(this);
    }

    

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler(e){

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
            this.setState({errorMessage: error.message})
        })
    }

    render() {
        const {username, password} = this.state

        //I know this error handling for incorrect login isn't the best, but we do intend to fix it.
        if(this.state.errorMessage !== ''){
            return(
                <div>
                    <br/><br/>
                    <h1>Oops! An error has occured!</h1>
                    <h3>Error: {this.state.errorMessage}</h3>
                    <h4>Are you sure you entered the correct login credentials?</h4>
                    <h5>Please refresh page and retry</h5>
                </div>
            );
        }
        else{
            return (
                <Container data-testid="login-form-container">

                    <Form className="login-form" data-testid="login-form" onSubmit={this.submitHandler}>
                        <h2 className="text-center">Sign in</h2>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control data-testid="username-input" type="text" 
                            placeholder="Enter username" name="username" value = {username} onChange={this.changeHandler}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control data-testid="password-input" type="password" 
                            placeholder="Password" name="password" value = {password} onChange={this.changeHandler}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group>

                        <Button data-testid="login-submit" variant="dark" type="submit" size="lg" block>
                            Log in
                        </Button>
                        
                    </Form>

                </Container>  
                        
            );
        }

        
    }
}

export default Login;