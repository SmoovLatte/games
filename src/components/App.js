import React from "react";
import Navigation from "./Navigation";
import Home from "./Home";
import Memory from "./memory";
import Minesweeper from "./minesweeper";
import Snake from "./snake";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Navigation></Navigation>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/memory" component={Memory} />
        <Route path="/snake" component={Snake} />
        <Route path="/minesweeper" component={Minesweeper} />
      </Switch>
    </Router>
  );
}

export default App;

// // you can write classes or method components in React

// class App extends React.Component {
//   render() {
//     return <div>Hello, world!</div>;
//   }
// }
