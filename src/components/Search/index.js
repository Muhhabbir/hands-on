const Search = ({ setSearchSong, getSong }) => {
    return (
          <div className="search-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearchSong(e.target.value)}
            />
            <button
              className="search-button"
              type="button"
              onClick={getSong}
            >
              Search
            </button>
          </div>
    );
  };
  
  export default Search;