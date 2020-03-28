import React, { Component } from 'react';
import axios from 'axios';

export class Video extends Component {

    state = 
    {
        token: localStorage.getItem('token'),
        auth: 'Token ' + localStorage.getItem('token'),
        videos: [],
        streams: [],
        streamName: '',
        streamURL: '',
    }
    
    //Handles changes made to the text fields for adding a livestream
    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    //Handles fetching the uploaded videos once the "Fetch Videos" button has been pressed.
    FetchUpSubmitHandler = e => {
        e.preventDefault()

        let url = 'http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/sdp';

        //Makes GET request to the API
        axios.get(url, {headers: {"authorization":this.state.auth}})
        .then(Response => {

            Response.data.map( vid => (
                this.setState({videos: this.state.videos.concat([vid])})
            ))
            
        })
        .catch(error => {
            console.log(error)
        })

        //Disables both fetch buttons once one is pressed, otherwise user could press repeatedly and stack a bunch of
        //video copies. Temporary solution.
        this.refs.fetchUp.setAttribute("disabled", "disabled");
        this.refs.fetchLv.setAttribute("disabled", "disabled");
    }

    //Handles fetching the live streams once the "Fetch Livestreams" button has been pressed.
    FetchLvSubmitHandler = e => {
        e.preventDefault()

        let user = localStorage.getItem('username');
        let url = "http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/" + user + "/live";

        //Makes GET request to the API
        axios.get(url, {headers: {"authorization":this.state.auth}})
        .then(Response => {

            console.log(Response)

            Response.data.map( strm => (
                this.setState({streams: this.state.streams.concat([strm])})
            ))
            
        })
        .catch(error => {
            console.log(error)
        })

        //Disables both fetch buttons once one is pressed, otherwise user could press repeatedly and stack a bunch of
        //video copies. Temporary solution.
        this.refs.fetchUp.setAttribute("disabled", "disabled");
        this.refs.fetchLv.setAttribute("disabled", "disabled");

    }
    
    //Handles the pressing of the edit video submit button for each video. "id" is the id of the video to be edited.
    editSubmitHandler = id => e => {
        e.preventDefault()

        let user = localStorage.getItem('username')
        console.log(this.state.auth)

        let url = "http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/" + user + "/" + id;

        axios.put(url, {"name":e.target[0].value}, {headers: {"Authorization":this.state.auth}} )
        .catch(error => {
            console.log(error)
        })

        //Forces page to refresh so that the changes to the video are displayed.
        window.location.reload(false);
    }

    //Not currently working due to backend issue on sponsor's side... "id" is the id of the live stream to be edited.
    editLiveSubmitHandler = id => e => {
        e.preventDefault()

        let un = localStorage.getItem('username')
        console.log(this.state.auth)

        let url = 'http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/' + un + '/live/' + id;

        axios.put(url, {"name":e.target[0].value}, {headers: {"Authorization":this.state.auth}} )
        .catch(error => {
            console.log(error)
        })

        //Forces page to refresh so that the changes to the video are displayed.
        window.location.reload(false);
    }

    //Handles the pressing of the "Upload Video" button.
    fileButtonHandler = e => {
        e.preventDefault()

        let user = localStorage.getItem('username')

        let url = "http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/" + user;
        const headers = {headers: {"Authorization":this.state.auth, 'Content-Type':'application/json'}};

        //Retrieves the file and its name to be passed to the API.
        const file = e.target.files[0];
        const fileName = e.target.files[0].name;

        const formData = new FormData();
        formData.append('name',fileName);
        formData.append('location',file)

        //Makes POST request to the API.
        axios.post(url, formData, headers)
        .then(Response => {
            alert('Successfully uploaded: ' + fileName  + '\nYou may need to refresh page to see new video.')
        })
        .catch(error => {
            console.log(error)
        })
    }

    //Handles the pressing of the "delete" button for each uploaded video. "id" is the id of the video to be deleted.
    delSubmitHandler = id => e => {
        e.preventDefault()

        let user = localStorage.getItem('username')

        let url = "http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/" + user + "/" + id;

        //Makes DELETE request to the API.
        axios.delete(url, {headers: {"Authorization":this.state.auth}} )
        .catch(error => {
            console.log(error)
        })

        //Forces page refresh so that changes are displayed.
        window.location.reload(false);
    }

    //Handlees the pressing of the "delete" button for each live stream. "id" is the id of the stream to be deleted.
    delLiveSubmitHandler = id => e => {
        e.preventDefault()

        let un = localStorage.getItem('username')

        let url = "http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/" + un + "/live/" + id;

        //Makes DELETE request to the API.
        axios.delete(url, {headers: {"Authorization":this.state.auth}} )
        .catch(error => {
            console.log(error)
        })

        //Forces refresh so that changes are displayed.
        window.location.reload(false);
    }

    //Handles the pressing of the "Add Livestream" button.
    AddLiveSubmitHandler = e => {
        e.preventDefault()

        let user = localStorage.getItem('username')

        let url = "http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/" + user + "/live";

        const headers = {headers: {"Authorization":this.state.auth, 'Content-Type':'application/json'}};

        //Retrieves name and link of stream to be added. These have been stored in state by the changeHandler.
        const formData = new FormData();
        formData.append('name',this.state.streamName);
        formData.append('link',this.state.streamURL)

        //Makes POST request to the API.
        axios.post(url, formData, headers)
        .then(Response => {
            alert('Successfully added: ' + this.state.streamName + '\nYou may need to refresh page to see new stream.')
        })
        .catch(error => {
            console.log(error)
        })

    }


    render() {

        //Various CSS styles for this page only.
        const subStyle = {
            "text-shadow": "2px 2px 5px black",
            "padding-top":"5px",
            "padding-bottom": "0px",
            "padding-left":"95px",
        };

        const UploadStyle = {
            "text-shadow": "2px 2px 5px black",
            "padding-top":"5px",
            "padding-bottom": "5px",
            "padding-left":"5px",
        };

        const listStyle = {
            "list-style-type": "none",
            "display": "inline-block",
            "padding": "40px",
        };

        const footerStyle = {
            "text-shadow": "2px 2px 5px black",
            "padding-top":"40px",
            "padding-bottom": "40px",
            "background-color": "#449342",
            "padding-left": "20px",
        };

        const formStyle = {
            "padding":"5px",
            "display":"inline",
        };

        const addLiveStlye = {
            "text-shadow": "2px 2px 5px black",
            "padding-top":"5px",
            "padding-bottom": "5px",
            "padding-right":"5px",
        };

        const formDivStyle = {
            "padding-top":"10px",
            "padding-bottom":"10px",
        };



        if(this.state.token != null)
        {
            return (
                <center>
                    <div class="fetchButton">
                            <form onSubmit={this.FetchUpSubmitHandler} style={formStyle}>
                                <button ref="fetchUp" class="btn dark" type="submit">Fetch Videos</button>
                            </form>
                        
                            <form onSubmit={this.FetchLvSubmitHandler} style={formStyle}>
                                <button ref="fetchLv" class="btn dark" type="submit">Fetch Livestreams</button>
                            </form>

                    </div>

                    <div style={formDivStyle}>
                        <input style={UploadStyle} type="file" name="file" onChange={this.fileButtonHandler} />

                        <form style={addLiveStlye} onSubmit={this.AddLiveSubmitHandler} >
                            <input class="botPad5" type="text" name="streamName" placeholder="Enter Stream Name" onChange={this.changeHandler}/> 
                            <input class="botPad5" type="text" name="streamURL" placeholder="Enter Stream Url" onChange={this.changeHandler}/>
                            <button class="btn dark margin5" type="submit">Add Livestream</button>
                        </form>
                    </div>


                    <div class="vidBackground">
                        <React.Fragment>

                            {/* This is what is displayed if the "Fetch Videos" button is pressed. */}
                            {this.state.videos.map(vid => (

                                <ul style={listStyle}>
                                    <li key={vid.id}>
                                        {/* <ReactPlayer url={vid.location} controls/> */}

                                        {/* This is how each video is displayed */}
                                        <video src={vid.location} width="480" height="270" controls>
                                            Your browser does not support the video tag.
                                        </video>

                                        {/* This displays the current title of the video and the edit button */}
                                        <form class="inline"  onSubmit={this.editSubmitHandler(vid.id, )}>
                                            <h3> Videos current title: {vid.name} </h3>
                                            <input class = "botPad5" type="text" placeholder="New title" id="title" name="title"/>
                                            <button class="btn dark margin5" type="submit">Submit</button>
                                        </form>

                                        {/* This displays the delete button. */}
                                        <form class="inline"  onSubmit={this.delSubmitHandler(vid.id, )}>
                                            <button class="btn dark" type="submit">Delete Video</button>
                                        </form>


                                    </li>
                                </ul>
                            ))

                            }

                            {/* This is what is displayed if the "Fetch Livestreams" button is pressed. */}
                            {this.state.streams.map(strm => (
                                <ul style={listStyle}>
                                    <li key={strm.id}>
                                        {/* <ReactPlayer url={vid.location} controls/> */}
                                        {/* <video src={strm.link} width="550" height="350" controls>
                                            Your browser does not support the video tag.
                                        </video> */}

                                        {/* This is where the streams are actually displayed */}
                                        <iframe title="streams" width="480" height="270" src={strm.link}></iframe>

                                        {/* This displays the current title of the stream and the edit button. */}
                                        <form class="inline" onSubmit={this.editLiveSubmitHandler(strm.id, )}>
                                            <h3> Videos current title: {strm.name} </h3>
                                            <input type="text" placeholder="New title" id="title" name="title"/>
                                            <button class="btn dark margin5" type="submit">Submit</button>
                                        </form>

                                        {/* This is the delete button */}
                                        <form class="inline" onSubmit={this.delLiveSubmitHandler(strm.id, )}>
                                            <button class="btn dark" type="submit">Delete Stream</button>
                                        </form>

                                    </li>
                                </ul>
                            ))
                            }

                        </React.Fragment>

                        <footer style={footerStyle} align="left">
                            
                        </footer>

                    </div>
                    

                </center>
            );
        }
        else{
            return(
                <div>
                    <h1>You must be logged in to view this page!</h1>
                    <h1>You must be logged in to view this page!</h1>
                    {alert("You must be logged in to view this page!")}
                    {this.props.history.push('/login')}
                </div>
            );
        }
    }
}

export default Video;