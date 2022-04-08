import { useEffect, useState } from "react";
import { createPlaylist, pushSongs } from "../../api/service";

const Playlist = ({ token, userId, songUris }) => {
  const [playlistID, setPlaylistID] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (playlistID) {
      addSongToPlaylist(playlistID);
    }
  }, [playlistID]);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.title.length > 10) {
      await createPlaylist(userId, form.title, form.description)
        .then((response) => {
          setPlaylistID(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
      setForm({ title: "", description: "" });
      alert("Successfully created playlist");
    } else {
      alert("Playlist title must be at least 10 characters long");
    }
  };

  const addSongToPlaylist = async (id) => {
    pushSongs(playlistID, songUris)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter name"
          value={form.name}
          name="name"
          onChange={handleForm}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter description"
          name="description"
          value={form.description}
          onChange={handleForm}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create Playlist
      </button>
    </form>
  );
};

export default Playlist;