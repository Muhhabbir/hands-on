import { useEffect, useState } from "react";
import Song from "./components/Song";
import "./index.css";
import axios from "axios";
import url from "./spotify/spotify";
import Playlist from "./components/Playlist";

function App() {
  const [token, setToken] = useState("");
  const [userID, setUserID] = useState("");
  const [searchSong, setSearchSong] = useState("");
  const [songData, setSongsData] = useState([]);
  const [selectedSong, setSelectedSong] = useState([]);
  const [combinedSongs, setCombinedSongs] = useState([]);

  useEffect(() => {
    const queryString = new URL(window.location.href.replace("#", "?"))
      .searchParams;
    const accessToken = queryString.get("access_token");
    setToken(accessToken);
    const handleCombinedSong = songData.map((song) => ({
      ...song,
      isSelected: selectedSong.find((data) => data === song.uri),
    }));
    setCombinedSongs(handleCombinedSong);
  }, [songData, selectedSong]);

  useEffect(() => {
    const getUserID = async () => {
      axios
        .get(`https://api.spotify.com/v1/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserID(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserID();
  }, [token]);

  const getSong = async () => {
    await axios
      .get(
        `https://api.spotify.com/v1/search?q=${searchSong}&type=track&access_token=${token}`
      )
      .then((response) => {
        setSongsData(response.data.tracks.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelectedSong = (uri) => {
    const selected = selectedSong.find((song) => song === uri);
    selected
      ? setSelectedSong(selectedSong.filter((song) => song !== uri))
      : setSelectedSong([...selectedSong, uri]);
  };

  return (
    <div className="App">
      <div className="playlist-login">
        <h1>Playlist</h1>
        <a href={url} className="btn btn-primary">
          Login To Spotify
        </a>
      </div>
      <div className="playlist-search">
        <div className="search-box">
          <div className="input-group mb-3">
            <input
              type="search"
              className="form-control"
              placeholder="Search"
              onChange={(e) => setSearchSong(e.target.value)}
            />
            <button className="btn btn-primary" type="button" onClick={getSong}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div>
        <Playlist userID={userID} token={token} songUris={selectedSong} />
      </div>
      <div className="playlist-songs">
        {combinedSongs.map((song) => {
          const { uri, name, album, artists, isSelected } = song;
          return (
            <Song
              key={uri}
              uri={uri}
              image={album.images[0]?.url}
              title={name}
              album={artists[0]?.name}
              selectState={handleSelectedSong}
              isSelected={isSelected}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;