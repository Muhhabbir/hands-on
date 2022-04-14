import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import PlaylistPage from "./pages/PlaylistPage";
import LoginPage from "./pages/LoginPage";
import "./index.css";

function App() {
  const token = useSelector((state) => state.token.value);

  return (
    <div className="p-5 bg-neutral-900 h-screen space-y-5 overflow-auto">
      <Router>
        <Switch>
          <Route exact path="/">
            {!token ? <LoginPage /> : <Redirect to="/create-playlist" />}
          </Route>
          <Route path="/create-playlist">
            <PlaylistPage />
          </Route>
          <Route path="*">
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;