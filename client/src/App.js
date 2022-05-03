import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import About from "./components/about";
import Navbar from "./components/navBar/NavBar";
import NotesList from "./components/notes-list";
import CreateExercise from "./components/create-note";
import Form from "./components/form/Form";
import Search from "./components/Search";

function App() {
  const [save, setsave] = useState(false);
  return (
    <div className="container">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/search" exact>
            <Search setsave={setsave} save={save} />
          </Route>
          <Route path="/" exact>
            <Form setsave={setsave} save={save} />
          </Route>
          <Route path="/create" exact>
            <CreateExercise save={save} />
          </Route>
          <Route path="/list" exact component={NotesList} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
