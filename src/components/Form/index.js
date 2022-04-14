import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  retrieveUserId,
  createPlaylist,
  pushSongs,
} from "../../api/axios";

const Form = ({ songUris }) => {
  const token = useSelector((state) => state.token.value);
  const [playlistId, setPlaylistId] = useState("");
  const [userId, setUserId] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const getUserId = () => {
      retrieveUserId(token)
        .then((response) => {
          setUserId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const addSongs = () => {
      pushSongs(playlistId, songUris, token)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (playlistId) {
      addSongs();
    }
    getUserId();
  }, [playlistId, songUris, token]);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.title.length > 10) {
      createPlaylist(userId, form.title, form.description, token)
        .then((response) => {
          setPlaylistId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
      setForm({ title: "", description: "" });
      alert("Playlist created!");
    } else {
      alert("Playlist title must be at least 10 characters long");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <div>
          <div className="form-title">
            <label htmlFor="title" className="form-title-text">
              Title
            </label>
            <input
              type="text"
              className="form-title-input"
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={handleForm}
            />
          </div>
          <div className="form-desc">
            <label htmlFor="title" className="form-desc-text">
              Description
            </label>
            <input
              type="text"
              className="form-desc-input"
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={handleForm}
            />
          </div>
          <div>
            <button
              id="submit"
              type="submit"
              className="createplaylist-button"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;