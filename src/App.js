import { useSelector } from "react-redux";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PlaylistPage from "./pages/PlaylistPage";

function App() {
  const token = useSelector((state) => state.token.value);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {!token ? <LoginPage /> : <Redirect to="/create-playlist" />}
          </Route>
          <Route path="/create-playlist">
            <PlaylistPage />
          </Route>
          <Route path="*">
            <h1>Error 404</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;