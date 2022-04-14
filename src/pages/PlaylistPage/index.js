import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Song from "../../components/Song";
import Search from "../../components/Search";
import { retrieveSongs } from "../../api/axios";
import { Text } from "@chakra-ui/react";

import Form from "../../components/Form";

const PlaylistPage = () => {
  const token = useSelector((state) => state.token.value);
  const [searchSong, setSearchSong] = useState("");
  const [songData, setSongData] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [combineSongs, setCombineSongs] = useState([]);

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

  return (
    <div>
      <div className="playlist-header">
        <Text fontSize="50px" fontWeight="bold" mb="7">
          Create Playlist
        </Text>
      </div>
      <Search getSong={getSong} setSearchSong={setSearchSong} />
      <Form songUris={selectedSongs} />

      <div className="song-list">
        {combineSongs.map((song) => {
          const { uri, name, artists, album, isSelected } = song;
          return (
            <Song
              key={uri}
              uri={uri}
              image={album.images[0]?.url}
              title={name}
              album={artists[0]?.name}
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