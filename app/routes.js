import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Champion from './components/Champion';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/champion/:id' component={Champion} />
  </Route>
);