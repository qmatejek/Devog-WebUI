import React, { Component } from 'react';
import axios from 'axios';

export class VideoTest extends Component {

    state = 
    {
        url: 'http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/sdp/live',
        token: localStorage.getItem('token'),
        auth: 'Token ' + localStorage.getItem('token'),
    }


    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.get(this.state.url, {headers: {"authorization":this.state.auth}})
        .then(Response => {
            console.log(Response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <h1>Press button for Videos</h1>
                    <h3>{this.state.token}</h3>
                    <h3>{this.state.auth}</h3>
                    <button type="submit">Submit</button>
                </form>
                

            </div>
        );
    }
}

export default VideoTest;