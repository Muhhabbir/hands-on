import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../reducer/slicer";
import url from "../../spotipi/spotify";

const LoginPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setToken(getToken()));
  }, [dispatch]);

  const getToken = () => {
    const queryString = new URL(window.location.href.replace("#", "?"))
      .searchParams;
    const accessToken = queryString.get("access_token");

    return accessToken;
  };

  return (
    <div className="login-container">
      <div className="login-button">
        <a
          href={url}
          className="login-text"
        >
          Login To Spotify
        </a>
      </div>
    </div>
  );
};

export default LoginPage;