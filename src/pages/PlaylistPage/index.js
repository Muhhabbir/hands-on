import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Song from "../../components/Song";
import Playlist from "../../components/Playlist";
import { retrieveSongs, retrieveUserID } from "../../api/service";

const PlaylistPage = () => {
  const token = useSelector((state) => state.token.value);

  const [userID, setUserID] = useState("");
  const [searchSong, setSearchSong] = useState("");
  const [songData, setSongsData] = useState([]);
  const [selectedSong, setSelectedSong] = useState([]);
  const [combinedSongs, setCombinedSongs] = useState([]);

  useEffect(() => {
    getUserID();
    const handleCombinedSong = songData.map((song) => ({
      ...song,
      isSelected: selectedSong.find((data) => data === song.uri),
    }));
    setCombinedSongs(handleCombinedSong);
  }, [songData, selectedSong]);

  const getSong = () => {
    retrieveSongs(searchSong)
      .then((response) => {
        setSongsData(response.data.tracks.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserID = () => {
    retrieveUserID()
      .then((response) => {
        setUserID(response.data.id);
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
    <div>
      <div className="playlist-header">
        <h1>Playlist</h1>
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
      <Playlist token={token} userID={userID} songUris={selectedSong} />
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
};

export default PlaylistPage;