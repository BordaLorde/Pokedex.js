import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import Pokedex from "./views/pokedex";
import Details from "./components/details";

const App = () => {
  return (
    <div>
      <Router>
        <div className="ui secondary pointing menu">
          <Link className="item" to="/">
            Home
          </Link>
          <Link className="item" to="/pokedex/page/1">
            Pokedex
          </Link>
          <Link className="item" to="/team_builder">
            Team Builder
          </Link>
        </div>

        <Switch>
          <Route path="/pokemon/:name">
            <Details />
          </Route>
          <Route path="/pokedex/page/:page">
            <PokedexHelper />
          </Route>
          <Route path="/team_builder">
            <Builder />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

function PokedexHelper() {
  let { page } = useParams();
  return <Pokedex page={page} />;
}
function Home() {
  return <h2>Home</h2>;
}

function Builder() {
  return <h2>Users</h2>;
}

ReactDOM.render(<App />, document.querySelector("#root"));
