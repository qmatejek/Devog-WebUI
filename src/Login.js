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
        console.log(this.state)
        axios.post('http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/login/', this.state)
        .then(Response => {
            console.log(Response)
            console.log(Response.data.token)
            localStorage.setItem('token', Response.data.token)
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
// export const Login = () =>(
   
//     <Container>
//     <Form className="login-form">
//         <h2 className="text-center">Sign in</h2>
//         <Form.Group controlId="formBasicEmail">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control type="email" placeholder="Enter email" />
//             <Form.Text className="text-muted">
//             We'll never share your email with anyone else.
//             </Form.Text>
//         </Form.Group>

//         <Form.Group controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control type="password" placeholder="Password" />
//         </Form.Group>
//         <Form.Group controlId="formBasicCheckbox">
//             <Form.Check type="checkbox" label="Remember me" />
//         </Form.Group>
//         <Button variant="dark" type="submit" size="lg" block>
//             Log in
//         </Button>
//     </Form>
//     </Container>
// )