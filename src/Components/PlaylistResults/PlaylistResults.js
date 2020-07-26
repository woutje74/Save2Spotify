import React from 'react';
import './PlaylistResults.css';
import PlaylistList from '../PlaylistList/PlaylistList';


class PlaylistResults extends React.Component {
    constructor(props){
        super(props);
        this.search = this.search.bind(this);
    }

    search(event){
        this.props.onClick(event);
        event.preventDefault();
    }

    render(){
        return(
            <div className="PlaylistResults" >
                <h2 onClick={this.search} title='If you are connected to Spotify, click here to retrieve your playlists'>My Playlists</h2>
                <PlaylistList playlists={this.props.playlistResults}
                             clickItem={this.props.clickItem}
                             />
            </div>
        )};
};

export default PlaylistResults