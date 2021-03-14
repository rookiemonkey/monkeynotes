import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import FormAddPage from './main/FormAddPage';
import Notebooks from './main/Notebooks';
import Notebook from './main/Notebook';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Notebooks} />
        <Route exact path="/add/page" component={FormAddPage} />
        <Route exact path="/:slug" component={Notebook} />
      </Switch>
    </BrowserRouter>
  );
}

export default App