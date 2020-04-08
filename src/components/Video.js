import React, { Component } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

export class Video extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            token: localStorage.getItem('token'),
            auth: 'Token ' + localStorage.getItem('token'),
            videos: [],
            streams: [],
            streamName: '',
            streamURL: '',
            errorMessage: '',
        }
        
        this.fetchUp = React.createRef();
        this.fetchLv = React.createRef();
    }

    
    //Handles changes made to the text fields for adding a livestream
    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }



    //Handles fetching the uploaded videos once the "Fetch Videos" button has been pressed.
    fetchUpSubmitHandler(e){
        e.preventDefault()


        let user = localStorage.getItem('username');

        let url = 'http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/' + user;

        axios.get(url, {headers: {"authorization":this.state.auth}})
        .then(Response => {

            Response.data.map( vid => (
                this.setState({videos: this.state.videos.concat([vid])})
            ))
            
        })
        .catch(error => {
            this.setState({errorMessage: error.message})
        })

        this.fetchUp.current.setAttribute("disabled", "disabled");
        this.fetchLv.current.setAttribute("disabled", "disabled");
    }

    //Handles fetching the live streams once the "Fetch Livestreams" button has been pressed.
    fetchLvSubmitHandler(e){
        e.preventDefault()

        let user = localStorage.getItem('username');
        let url = "http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/" + user + "/live";

        axios.get(url, {headers: {"authorization":this.state.auth}})
        .then(Response => {

            Response.data.map( strm => (
                this.setState({streams: this.state.streams.concat([strm])})
            ))
            
        })
        .catch(error => {
            this.setState({errorMessage: error.message})
        })

        this.fetchUp.current.setAttribute("disabled", "disabled");
        this.fetchLv.current.setAttribute("disabled", "disabled");

    }
    
    //Handles the pressing of the edit video submit button for each video. "id" is the id of the video to be edited.
    editSubmitHandler(e, id){
        e.preventDefault()

        let user = localStorage.getItem('username')

        let url = "http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/" + user + "/" + id;

        axios.put(url, {"name":e.target[0].value}, {headers: {"Authorization":this.state.auth}} )
        .catch(error => {
            this.setState({errorMessage: error.message})
        })

        window.location.reload(false);
    }

    //Not currently working due to backend issue on sponsor's side... "id" is the id of the live stream to be edited.
    editLiveSubmitHandler(e, id){
        e.preventDefault()

        let un = localStorage.getItem('username')

        let url = 'http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/' + un + '/live/' + id;

        axios.put(url, {"name":e.target[0].value}, {headers: {"Authorization":this.state.auth}} )
        .catch(error => {
            this.setState({errorMessage: error.message})
        })

    }

    //Handles the pressing of the "Upload Video" button.
    fileButtonHandler(e){
        e.preventDefault()

        let user = localStorage.getItem('username')

        let url = "http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/" + user;
        const headers = {headers: {"Authorization":this.state.auth, 'Content-Type':'application/json'}};

        const file = e.target.files[0];
        const fileName = e.target.files[0].name;

        const formData = new FormData();
        formData.append('name',fileName);
        formData.append('location',file)

        axios.post(url, formData, headers)
        .then(Response => {
            alert('Successfully uploaded: ' + fileName  + '\nYou may need to refresh page to see new video.')
        })
        .catch(error => {
            this.setState({errorMessage: error.message})
        })
    }

    //Handles the pressing of the "delete" button for each uploaded video. "id" is the id of the video to be deleted.
    delSubmitHandler(e, id){
        e.preventDefault()

        let user = localStorage.getItem('username')

        let url = "http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/" + user + "/" + id; 

        axios.delete(url, {headers: {"Authorization":this.state.auth}} )
        .catch(error => {
            this.setState({errorMessage: error.message})
        })

        window.location.reload(false);
    }

    //Handlees the pressing of the "delete" button for each live stream. "id" is the id of the stream to be deleted.
    delLiveSubmitHandler(e, id){
        e.preventDefault()

        let un = localStorage.getItem('username')

        let url = "http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/" + un + "/live/" + id;

        axios.delete(url, {headers: {"Authorization":this.state.auth}} )
        .catch(error => {
            this.setState({errorMessage: error.message})
        })

        window.location.reload(false);
    }

    //Handles the pressing of the "Add Livestream" button.
    addLiveSubmitHandler(e){
        e.preventDefault()

        let user = localStorage.getItem('username')

        let url = "http://vision-flow-apiapp.ysy9jamj5c.us-east-1.elasticbeanstalk.com/appview/" + user + "/live";

        const headers = {headers: {"Authorization":this.state.auth, 'Content-Type':'application/json'}};

        const formData = new FormData();
        formData.append('name',this.state.streamName);
        formData.append('link',this.state.streamURL)

        axios.post(url, formData, headers)
        .then(Response => {
            alert('Successfully added: ' + this.state.streamName + '\nYou may need to refresh page to see new stream.')
        })
        .catch(error => {
            this.setState({errorMessage: error.message})
        })

    }


    render() {

        const subStyle = {
            "textShadow": "2px 2px 5px black",
            "paddingTop":"5px",
            "paddingBottom": "0px",
            "paddingLeft":"95px",
        };

        const UploadStyle = {
            "paddingTop":"5px",
            "paddingBottom": "5px",
            "paddingLeft":"5px",
        };

        const listStyle = {
            "listStyleType": "none",
            "display": "inline-block",
            "padding": "40px",
        };

        const footerStyle = {
            "textShadow": "2px 2px 5px black",
            "paddingTop":"40px",
            "paddingBottom": "40px",
            "backgroundColor": "#449342",
            "paddingLeft": "20px",
        };

        const formStyle = {
            "padding":"5px",
            "display":"inline",
        };

        const addLiveStyle = {
            "textShadow": "2px 2px 5px black",
            "paddingTop":"5px",
            "paddingBottom": "5px",
            "paddingRight":"5px",
        };

        const formDivStyle = {
            "paddingTop":"10px",
            "paddingBottom":"10px",
        };


        if(this.state.errorMessage !== ''){
            return(
                <div>
                    {console.log("error branch")}
                    <br/><br/>
                    <h1>Oops! An error has occured!</h1>
                    <h3>Error: {this.state.errorMessage}</h3>
                </div>
            );
        }
        else if(this.state.token != null && this.state.errorMessage === '')
        {
            return (
                <center>
                    <div className="fetchButton">
                            <form style={formStyle} onSubmit={(e) => this.fetchUpSubmitHandler(e)}>
                                <button ref={ this.fetchUp } className="btn dark" type="submit">Fetch Videos</button>
                            </form>
                        
                            <form onSubmit={(e) => this.fetchLvSubmitHandler(e)} style={formStyle}>
                                <button ref={ this.fetchLv } className="btn dark" type="submit">Fetch Livestreams</button>
                            </form>

                    </div>

                    <div style={formDivStyle}>
                        <input style={UploadStyle} type="file" name="file" onChange={(e) => this.fileButtonHandler(e)} />

                        <form style={addLiveStyle} onSubmit={(e) => this.addLiveSubmitHandler(e)} >
                            <input className="botPad5" type="text" name="streamName" placeholder="Enter Stream Name" onChange={this.changeHandler}/> 
                            <input className="botPad5" type="text" name="streamURL" placeholder="Enter Stream Url" onChange={this.changeHandler}/>
                            <button className="btn dark margin5" type="submit">Add Livestream</button>
                        </form>
                    </div>


                    <div className="vidBackground">
                        <React.Fragment>

                            {/* This is what is displayed if the "Fetch Videos" button is pressed. */}
                            {this.state.videos.map(vid => (

                                <ul style={listStyle} key={vid.id}>
                                    <li key={vid.id}>

                                        <video src={vid.location} width="480" height="270" controls>
                                            Your browser does not support the video tag.
                                        </video>

                                        {/* This displays the current title of the video and the edit button */}
                                        <form className="inline"  onSubmit={(e) => {this.editSubmitHandler(e, vid.id )}}>
                                            <h3> Videos current title: {vid.name} </h3>
                                            <input className = "botPad5" type="text" placeholder="New title" id="title" name="title"/>
                                            <button className="btn dark margin5" type="submit">Submit</button>
                                        </form>

                                        <form className="inline"  onSubmit={(e) => {this.delSubmitHandler(e, vid.id )}}>
                                            <button className="btn dark" type="submit">Delete Video</button>
                                        </form>


                                    </li>
                                </ul>
                            ))

                            }

                            {/* This is what is displayed if the "Fetch Livestreams" button is pressed. */}
                            {this.state.streams.map(strm => (
                                <ul style={listStyle}>
                                    <li key={strm.id}>
                                        {/* <ReactPlayer url={strm.link} controls/> */}
                                        {/* <video src={strm.link} width="550" height="350" controls>
                                            Your browser does not support the video tag.
                                        </video> 
                                        Still trying to figure out the best one to use...*/}

                                        <iframe title="streams" width="480" height="270" src={strm.link}></iframe>

                                        {/* This displays the current title of the stream and the edit button. */}
                                        <form className="inline" onSubmit={(e) => {this.editLiveSubmitHandler(e, strm.id )}}>
                                            <h3> Videos current title: {strm.name} </h3>
                                            <input type="text" placeholder="New title" id="title" name="title"/>
                                            <button className="btn dark margin5" type="submit">Submit</button>
                                        </form>

                                        <form className="inline" onSubmit={(e) => {this.delLiveSubmitHandler(e, strm.id )}}>
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
        else if(this.state.errorMessage === '' && this.state.token === null){
            return(
                <div>
                    {console.log("no token branch")}
                    <br/><br/>
                    <h1>You must be logged in to view this page!</h1>
                    {alert("You must be logged in to view this page!")}
                    {window.location.replace("/login")}
                </div>
            );
        }
      
    }
}

export default Video;