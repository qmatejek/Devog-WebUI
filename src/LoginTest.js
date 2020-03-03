import React, { Component } from 'react';
import axios from 'axios';

export class LoginTest extends Component {
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
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    render() {
        const {username, password} = this.state
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input type="text" placeholder="Username" name="username" value = {username} onChange={this.changeHandler} />
                    </div>

                    <div>
                    <input type="text" name="password" placeholder = "Password" value = {password} onChange={this.changeHandler} />
                    </div>

                    <button type="submit">Submit</button>

                </form>
            </div>
        );
    }
}

export default LoginTest;