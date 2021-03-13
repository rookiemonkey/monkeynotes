import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Notebooks from './main/Notebooks';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Notebooks} />
      </Switch>
    </BrowserRouter>
  );
}

export default App