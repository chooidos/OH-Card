import React from 'react';
import { BrowserRouter as Router, Switch, Route, HashRouter } from 'react-router-dom';

import { List } from './modules/oh-indicators-list';

const App = () => {
  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route path="/test">
            <>
              <div>1</div>
              <div>2</div>
            </>
          </Route>
          <Route path="/" exact>
            <List />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
