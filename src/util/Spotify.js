let accessToken;
const clientId = 'new code';
const redirectUri = 'http://save2spotify.surge.sh';

const Spotify = { 
    getAccessToken(){
        if (accessToken) {
            return accessToken;
        }
        //check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch =  window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            //this clears the parameters, allowing us to grab a new access token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
        
    },

    getUserInfo(accessToken){
        let userInfo;
        return fetch (`https://api.spotify.com/v1/me`,
        { headers: {
            Authorization: `Bearer ${accessToken}`
            }
        }).then(response => { //converts response to JSON
            return response.json();
        }).then(jsonResponse => {
            userInfo = jsonResponse.display_name;
            if (!jsonResponse.display_name) {
                return '??';
            } 
            return userInfo;
        })
    },

    search(term, accessToken){
        return fetch (`https://api.spotify.com/v1/search?type=track&q=${term}`,
        { headers: {
            Authorization: `Bearer ${accessToken}`
            }
        }).then(response => { //converts response to JSON
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            } 
            return jsonResponse.tracks.items.map(track => ({  //maps JSON response to an array of objects
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                trackUrl: track.preview_url
            }));
        })
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', { 
            headers: headers
            }
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                })
            })
        })
    },

    getPlaylist(accessToken){
        const headers = { Authorization: `Bearer ${accessToken}`};
        let playlists;

        return fetch('https://api.spotify.com/v1/me/playlists', { 
            headers: headers
            }
        ).then(response => response.json()
        ).then(jsonResponse => {
            playlists = jsonResponse.items;
            if (!jsonResponse.items) {
            return [];
            } 
            return playlists.map(playlist => ({  //maps JSON response to an array of objects
            id: playlist.id,
            name: playlist.name,
            number: playlist.tracks.total,
            uri: playlist.uri
        }));
        })
    },

    getTrack(term){
        const accessToken = Spotify.getAccessToken();
        return fetch (`https://api.spotify.com/v1/tracks/${term}`,
        { headers: {
            Authorization: `Bearer ${accessToken}`
            }
        }).then(response => { //converts response to JSON
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.album) {
                return {};
            } 
            return jsonResponse.album.preview_url;
        })
    },

    getPlaylistTracks(term, accessToken){
        return fetch (`https://api.spotify.com/v1/playlists/${term}/tracks`,
        { headers: {
            Authorization: `Bearer ${accessToken}`
            }
        }).then(response => { //converts response to JSON
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.items) {
                return [];
            } 
            return jsonResponse.items.map(track => ({  //maps JSON response to an array of objects
                id: track.track.id,
                name: track.track.name,
                artist: track.track.album.artists[0].name,
                album: track.track.album.name,
                uri: track.track.uri,
                trackUrl: track.track.preview_url
            }));
        })
    }
}

export default Spotify;

