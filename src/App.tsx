import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, HashRouter, Link } from 'react-router-dom';

import { ResponsiveCards } from './components/molecules/cards/responsive-cards';
import { actions } from './modules/oh-indicators-list/store';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAllItems());
    dispatch(actions.initSseConnection());
    return () => {
      dispatch(actions.closeSseConnection());
    }
  }, [])

  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <ResponsiveCards />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;
