import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Room from "./Room";

const App = () => (
  <Router>
    <Route path="/" exact component={HomePage} />

    <Route path="/chat" component={Room} />
  </Router>
);
export default App;
