import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import { List } from './modules/oh-indicators-list';

const Auth = () => (
  <AmplifyAuthenticator>
    <div>
      My App
      <AmplifySignOut />
    </div>
  </AmplifyAuthenticator>
);

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={List} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
