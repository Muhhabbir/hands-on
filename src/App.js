import Song from "./components/Song";
import data from "./track";
import "./index.css";

console.log(data);
function App() {
  return (
    <div className="App">
      <h1>Playlist</h1> 
      {data.map((song) => {
        const { id, name, artists, album } = song;
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
  );
}

export default App;