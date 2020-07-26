import React from 'react';
import './PlaylistItem.css';



class PlaylistItem extends React.Component {
    constructor(props){
        super(props);
        this.state ={term: this.props.playlist.id};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        this.props.onSearch(this.state.term);
        event.preventDefault();
    }


    render(){
        return (
        <div>    
            <div className="PlaylistItem" title='Click on the playlist to retrieve the tracks in this playlist.'>
                <div className="PlaylistItem-information">
                    <h3 value={this.props.playlist.id}
                        onClick={this.handleClick}
                        >{this.props.playlist.name}</h3>
                        <p>Number of tracks: {this.props.playlist.number}</p>
                </div>
            </div>
        </div>
        )
    }
}

export default PlaylistItem;

