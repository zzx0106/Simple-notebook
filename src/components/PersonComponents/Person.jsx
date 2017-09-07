import React from "react";
import {Route, Switch} from "react-router-dom";
import {Login, Register, PersonMessage, WriteNote, NoteShow} from "../../routers/lazy-router.js";
// import Login from "../../containers/PersonContainer/Login"; import Regist
// from "../../containers/PersonContainer/Register"; import PersonMessage from
// "../../containers/PersonContainer/PersonMessage";
const Person = props => <div className="Person top-box">
  <Switch>
    <Route
      exact
      path={`${props.match.path}/PersonMessage`}
      component={PersonMessage}/>
    <Route path={`${props.match.path}/Login`} component={Login}/>
    <Route path={`${props.match.path}/Register`} component={Register}/>
    <Route path={`${props.match.path}/WriteNote`} component={WriteNote}/>
    <Route
      path={`${props.match.path}/NoteShow/:note_id/:author_id/:user_nickname`}
      component={NoteShow}/>
  </Switch>
</div>;
export default Person;
