import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Song from "../../components/Song";
import Search from "../../components/Search";
import { retrieveSongs } from "../../api/axios";
import { Text, Button } from "@chakra-ui/react";

import Form from "../../components/Form";

const PlaylistPage = () => {
  const token = useSelector((state) => state.token.value);
  const [searchSong, setSearchSong] = useState("");
  const [songData, setSongData] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [combineSongs, setCombineSongs] = useState([]);
  const REDIRECT_URI = "http://localhost:3000/";

  useEffect(() => {
    const handleCombineTracks = songData.map((song) => ({
      ...song,
      isSelected: selectedSongs.find((data) => data === song.uri),
    }));
    setCombineSongs(handleCombineTracks);
  }, [songData, selectedSongs]);

  const getSong = () => {
    retrieveSongs(searchSong, token)
      .then((response) => {
        setSongData(response.data.tracks.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelect = (uri) => {
    const selected = selectedSongs.find((song) => song === uri);
    selected
      ? setSelectedSongs(selectedSongs.filter((song) => song !== uri))
      : setSelectedSongs([...selectedSongs, uri]);
  };

  const handleLogout = ()=>{
    window.location = REDIRECT_URI;
}

  return (
    <div>
      <div className="playlist-header">
        <Text color="blue.200" fontSize="70px" fontWeight="bold" mb="6">
          Spotify Playlist Creator
        </Text>
        <Button
            colorScheme="blue" mb="30px"
            onClick={() => {
              handleLogout();
            }}
          >Logout
          </Button>
      </div>
      <Search getSong={getSong} setSearchSong={setSearchSong} />
      <Form songUris={selectedSongs} />

      <div className="song-list">
        {combineSongs.map((song) => {
          const { uri, name, artists, album, duration_ms, isSelected } = song;
          return (
            <Song
              key={uri}
              uri={uri}
              image={album.images[0]?.url}
              title={name}
              artists={artists[0]?.name}
              album={album.name}
              duration={duration_ms}
              selectState={handleSelect}
              isSelected={isSelected}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PlaylistPage;