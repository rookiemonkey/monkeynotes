import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Notebooks from './main/Notebooks';
import Notebook from './main/Notebook';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Notebooks} />
        <Route exact path="/:slug" component={Notebook} />
      </Switch>
    </BrowserRouter>
  );
}

export default App