import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, HashRouter } from 'react-router-dom';

import { actions } from './modules/oh-indicators-list/store';
import { RoomBuilder } from "./modules/ui-room-builder/room-builder";

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
            <RoomBuilder />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;
