import './App.css';
import MainPanel from './Components/MainPanel/MainPanel';
import PullRequestPanel from './Components/PullRequestPanel/PullRequestPanel';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Redirect to="/branches" />
        </Route>
        <Route path="/branches">
          <MainPanel/>
        </Route>
        <Route path="/pullRequests">
          <PullRequestPanel/>
        </Route>
      </Router>
    </div>
  );
}
