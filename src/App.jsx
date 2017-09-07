import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import RightSideBar from "./containers/HomeContainer/RightSideBar";
import { Home, Person, Note, Documents, Loves } from "./routers/lazy-router.js";
class App extends Component {
  render() {
    return (
      <div className="App top-box">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Person" component={Person} />
          <Route path="/Note" component={Note} />
          <Route path="/Documents" component={Documents} />
          <Route path="/Loves" component={Loves} />
        </Switch>
        <RightSideBar />
      </div>
    );
  }
}

export default App;
