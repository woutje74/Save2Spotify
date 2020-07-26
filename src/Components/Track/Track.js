import React from 'react';
import './Track.css';
import Audio from '../Audio/Audio';

class Track extends React.Component {
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack(){
        this.props.onAdd(this.props.track); //calls the addTrack method in App class with the value of the track object
    }
    
    removeTrack(){
        this.props.onRemove(this.props.track)
    }


    renderAction(){
        if (this.props.isRemoval){
            return <button className="Track-action" onClick={this.removeTrack}>-</button>;
        } else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>;
        }
    }

    renderPlayback(){
        if (this.props.trackUrl){
            return <Audio trackUrl={this.props.trackUrl}/>
        }
    }

    
    render(){
        return (
        <div>    
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p> {this.props.track.artist} | {this.props.track.album}</p>
                    {this.renderPlayback()}
                </div>
                {this.renderAction()}
            </div>
            
        </div>
        )
    }
}

export default Track;