import React from 'react';
import './ConnectToSpotify.css';
import Spotify from '../../util/Spotify';

class ConnectToSpotify extends React.Component{
    constructor(props){
        super(props);
        this.state= {user: '...'};
        this.connect=this.connect.bind(this);
    }

    connect(event){
        Spotify.getUserInfo(this.props.access)
        .then(userInfo => {
            this.setState(
                {user: userInfo}
                )
            }
        );
        event.preventDefault();
    }

    render(){
        return(
        <div className="Connect" title='Click to connect to your Spotify account. You may be prompted to log in and grant access to this app.'>
            <button className="ConnectButton" onClick={this.connect}>Connected to: {this.state.user}</button>
        </div>
        )};
}

export default ConnectToSpotify;
