import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, HashRouter, Link } from 'react-router-dom';

import { ConnectionIndicator } from './components/atoms/connection-indicator/ConnectionIndicator';
import { ConnectionStates } from './constants/network';
import { List } from './modules/oh-indicators-list';
import { selectors } from './modules/oh-indicators-list/store';

const App = () => {
  const sseConnection = useSelector(selectors.selectIsConnected);
  return (
    <HashRouter>
      <div className="App">
        <div style={{ margin: '1rem 2rem' }}>
          <ConnectionIndicator connectionState={sseConnection.state} />
          {sseConnection.state === ConnectionStates.Connected ? (
            <Link to="/test">Close connection</Link>
          ) : (
            <Link to="/">
              {sseConnection.state === ConnectionStates.Transition ? 'Connecting...' : 'Connect'}
            </Link>
          )}
        </div>
        <Switch>
          <Route path="/test">
            <div>
              {sseConnection.state === ConnectionStates.Connected
                ? 'Disconnecting'
                : 'Connection closed'}
            </div>
          </Route>
          <Route path="/" exact>
            <List />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;
