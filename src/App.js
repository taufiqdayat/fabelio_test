import React from 'react';
import {Provider} from 'react-redux';
import configureStore, {history} from './store';
import {ConnectedRouter} from 'connected-react-router';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import MainApp from './MainApp';

const store=configureStore();

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={MainApp} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
