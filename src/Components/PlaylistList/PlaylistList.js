import React from 'react';
import './PlaylistList.css';
import PlaylistItem from '../PlaylistItem/PlaylistItem';

class PlaylistList extends React.Component {
   
    render(){
        return(
            <div className="listItem" >
                { 
                this.props.playlists.map(playlist => { 
                    return <PlaylistItem playlist={playlist} 
                            key={playlist.id}
                            onSearch={this.props.clickItem}
                                            />
                    })
                }
            </div>
        )
    }
};

export default PlaylistList


/*


}*/
