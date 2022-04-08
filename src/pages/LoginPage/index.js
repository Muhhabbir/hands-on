import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../reducer/slice";
import url from "../../spotipi/spotify";

const getToken = () => {
  const queryString = new URL(window.location.href.replace("#", "?"))
    .searchParams;
  const accessToken = queryString.get("access_token");

  return accessToken;
};

const LoginPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setToken(getToken()));
  }, [dispatch]);

  return (
    <div className="playlist-login">
      <h1>Playlist</h1>
      <a href={url} className="btn btn-primary">
        Login To Spotify
      </a>
    </div>
  );
};

export default LoginPage;
