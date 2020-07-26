import React from 'react';
//import logo from './logo.svg';
import './App.css';
import ConnectToSpotify from '../ConnectToSpotify/ConnectToSpotify';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import PlaylistResults from '../PlaylistResults/PlaylistResults';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      accessToken: '',
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      playlistResults: [],
      isRemoval: 'false',
      trackUrl: '',
      };
    /*this.connectToSpotify = this.connectToSpotify.bind(this);*/
    this.addTrack = this.addTrack.bind(this);  
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName =this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
    this.getPlaylistTracks= this.getPlaylistTracks.bind(this);
  }

  componentDidMount(){
    this.setState({accessToken: Spotify.getAccessToken()})
  }


 /* connectToSpotify(){ 
    Spotify.getUserInfo(this.state.accessToken).then(userInfo => {
      this.setState({user: userInfo})})
  }*/
  
  addTrack(track){
    let currentPlayList = this.state.playlistTracks;
    if(currentPlayList.find(savedTrack => savedTrack.id === track.id)){
      return 
    } else {
      currentPlayList.push(track);
      this.setState(
        {playlistTracks: currentPlayList}
      )
    }; 
  }

  removeTrack(track){
    let currentPlayList = this.state.playlistTracks;
    currentPlayList = currentPlayList.filter(currentTrack => currentTrack.id !== track.id); //filters out tracks whos id is not in the current list
    this.setState(
      {playlistTracks: currentPlayList}
    )
  }

  updatePlaylistName(name){
    this.setState({
      playlistName: name
    })
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term){
    Spotify.search(term, this.state.accessToken).then(searchResults => {
    this.setState({ searchResults: searchResults})
    })
  }

  getPlaylists(){
    Spotify.getPlaylist(this.state.accessToken).then(playlistResults => {
      this.setState({ playlistResults: playlistResults})
    })
  }

  getPlaylistTracks(term){
    Spotify.getPlaylistTracks(term, this.state.accessToken).then(searchResults => {
      this.setState({ 
        searchResults: searchResults,
        isRemoval: 'true'})
    })
  }
  
  render(){
    return (
      <div>
        <div className="container">
          <div className="title">
            <h1>Save<span className="highlight">2</span>Spotify</h1>
          </div>
        </div>
       <div className="App">
          <ConnectToSpotify  access={this.state.accessToken}/>
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist" id="tracklist">
            <SearchResults searchResults = {this.state.searchResults} 
                            onAdd={this.addTrack}
                            isRemoval={this.state}
                            />
          <div> 
            <Playlist playlistName = {this.state.playlistName} 
                      playlistTracks = {this.state.playlistTracks} 
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist} 
            />
            <PlaylistResults playlistResults={this.state.playlistResults} 
                             onClick={this.getPlaylists} 
                             clickItem={this.getPlaylistTracks}
                             />
          </div>
          </div>
       </div>
     </div>
   );
  }
}

export default App;


//onAdd passes addTrack method to SearchResults
//onRemove passes removeTrack method to Playlist
//onConnect={this.connectToSpotify}