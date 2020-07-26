import React from 'react';
import './Audio.css';

class Audio extends React.Component {
    componentDidMount(){
        let audio = document.getElementById('myaudio');
        audio.volume = 0.2;
    }

    render(){
        return <audio id="myaudio" controls type="audio/mp3" src={this.props.trackUrl} ></audio>
    }
}

export default Audio