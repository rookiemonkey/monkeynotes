import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import FormAddPage from './main/FormAddPage';
import Categories from './main/Categories';
import Notebook from './main/Notebook';
import Page from './main/Page';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Categories} />
        <Route exact path="/add/page" component={FormAddPage} />
        <Route exact path="/notebook/:slug" component={Notebook} />
        <Route exact path="/notebook/:slug/:pageSlug" component={Page} />
      </Switch>
    </BrowserRouter>
  );
}

export default App