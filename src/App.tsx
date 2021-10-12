import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, HashRouter, Link } from 'react-router-dom';

import { ConnectionIndicator } from './components/atoms/connection-indicator/ConnectionIndicator';
import { ConnectionStates } from './constants/network';
import { List } from './modules/oh-indicators-list';
import { selectors } from './modules/oh-indicators-list/store';
import { Card } from "./components/atoms/card/card";
import { ResponsiveGrid } from "./components/atoms/responsive-grid/responsive-grid";

const layouts = {
  lg: [
    { i: "1", x: 0, y: 0, w: 1, h: 1, static: false },
    { i: "2", x: 1, y: 0, w: 3, h: 2, static: false },
    { i: "3", x: 6, y: 0, w: 1, h: 2, static: false },
  ],
};

const cards = [
  { title: "a", key: "1" },
  { title: "b", key: "2" },
  { title: "c", key: "3" },
];

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
            <ResponsiveGrid
              layouts={layouts}
              cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            >
              {cards.map((item, index) => (
                <Card key={item.key} title={item.title}>
                  <span className="text">{index}</span>
                </Card>
              ))}
            </ResponsiveGrid>
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;
