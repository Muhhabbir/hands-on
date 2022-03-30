import { useEffect, useState } from "react";
import Song from "./components/Song";
// import data from "./track";
import "./index.css";
import axios from "axios";
import url from "./spotify/spotify";

function App() {
  const [token, setToken] = useState("");
  const [searchSong, setSearchSong] = useState("");
  const [songData, setSongsData] = useState([]);

  useEffect(() => {
    const queryString = new URL(window.location.href.replace("#", "?"))
      .searchParams;
    const accessToken = queryString.get("access_token");
    setToken(accessToken);
  }, []);

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

  return (
    <div className="App">
      <div className="playlist-login">
        <h1>Playlist</h1>
        <a href={url} className="btn btn-primary">
          Login
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
      <div className="playlist-songs">
        {songData.map((song) => {
          const { id, name, album, artists } = song;
          return (
            <Song
              key={id}
              image={album.images[0]?.url}
              title={name}
              album={artists[0]?.name}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;