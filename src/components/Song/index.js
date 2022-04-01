const Song = ({ uri, image, title, album, selectState, isSelected }) => {
  return (
    <div className="playlist-container">
      <div className="playlist-item">
        <img className="song-image" src={image} alt="Album" />
        <div className="song-desc">
          <h5 className="song-title">{title}</h5>
          <p className="song-album">{album}</p>
        </div>
      </div>
      <button
        className="playlist-action"
        onClick={() => {
          selectState(uri);
        }}
      >
        {isSelected ? "Deselect" : "Select"}
      </button>
    </div>
  );
};

export default Song;