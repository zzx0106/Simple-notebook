import Bundle from "../utils/Bundle";
import React from "react";
export const Home = props =>
  <Bundle load={() => import("../components/HomeComponents/Home.jsx")}>
    {Home => <Home {...props} />}
  </Bundle>;
export const Person = props =>
  <Bundle load={() => import("../components/PersonComponents/Person.jsx")}>
    {Person => <Person {...props} />}
  </Bundle>;
export const Note = props =>
  <Bundle load={() => import("../components/NoteComponents/Note.jsx")}>
    {Note => <Note {...props} />}
  </Bundle>;
export const Documents = props =>
  <Bundle
    load={() => import("../components/DocumentsComponents/Documents.jsx")}
  >
    {Documents => <Documents {...props} />}
  </Bundle>;
export const Loves = props =>
  <Bundle load={() => import("../components/LovesComponents/Loves.jsx")}>
    {Loves => <Loves {...props} />}
  </Bundle>;

export const Login = props =>
  <Bundle load={() => import("../containers/PersonContainer/Login.jsx")}>
    {Login => <Login {...props} />}
  </Bundle>;
export const Register = props =>
  <Bundle load={() => import("../containers/PersonContainer/Register.jsx")}>
    {Register => <Register {...props} />}
  </Bundle>;
export const PersonMessage = props =>
  <Bundle
    load={() => import("../containers/PersonContainer/PersonMessage.jsx")}
  >
    {PersonMessage => <PersonMessage {...props} />}
  </Bundle>;
export const WriteNote = props =>
  <Bundle
    load={() => import("../components/PersonComponents/WriteNote.jsx")}
  >
    {WriteNote => <WriteNote {...props} />}
  </Bundle>;
export const NoteShow = props =>
  <Bundle
    load={() => import("../components/PersonComponents/NoteShow.jsx")}
  >
    {NoteShow => <NoteShow {...props} />}
  </Bundle>;
// export const Page2_Child3 = props =>
//   <Bundle load={() => import("../components/Page2_Child3.js")}>
//     {Page1 => <Page1 {...props} />}
//   </Bundle>;
