import React, { Component } from 'react';
import axios from 'axios';

export class VideoTest extends Component {

    state = 
    {
        url: 'http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/sdp',
        token: localStorage.getItem('token'),
        auth: 'Token ' + localStorage.getItem('token'),
        videos: [],
        res: '',
    }


    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.get(this.state.url, {headers: {"authorization":this.state.auth}})
        .then(Response => {
            console.log(Response)
            this.setState({res: Response}) //Does work!
            // this.setState({videos: this.state.videos.concat(Response.data[0])})
            //console.log(this.state.res.data[0].location)
            console.log(Object.keys(this.state.res.data))
            
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <center>
                <form onSubmit={this.submitHandler}>
                    <h1>Press button for Videos</h1>
                    {/* <h3>{this.state.token}</h3>
                    <h3>{this.state.auth}</h3> */}
                    <button type="submit">Submit</button>
                </form>

                <div>
                    <h3>This is vid display </h3>
                    <React.Fragment>
                        {/* {console.log(Object.keys(this.state.res.data))} */}
                        {/* {Object.keys(this.state.res.data)} */}
                    </React.Fragment>
                </div>
                

            </center>
        );
    }
}

export default VideoTest;