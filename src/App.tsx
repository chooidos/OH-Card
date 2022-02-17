import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';

import { actions } from './modules/oh-indicators-list/store';
import { RoomBuilder } from './modules/ui-room-builder/room-builder';
import { selectors as uiSelectors } from './modules/ui-room-builder/store';
import { actions as uiActions } from './modules/ui-room-builder/store';
import { switchEditMode } from './modules/ui-room-builder/store/slice';

import { NavBar } from './components/molecules/nav-bar/nav-bar';
import { SettingsForm } from './components/organizms/settings-form/settings-form';

const App = () => {
  const dispatch = useDispatch();
  const editMode = useSelector(uiSelectors.selectEditMode);
  const serverUrl = useSelector(uiSelectors.selectServerUrl);
  const history = useHistory();

  useEffect(() => {
    dispatch(uiActions.getUiStateFromStorage());
    if (serverUrl) {
      dispatch(actions.getAllItems(serverUrl));
      dispatch(actions.initSseConnection({ url: serverUrl, items: '*' }));
    }
    history.location.pathname === '/settings' && !editMode && history.push('/');
    return () => {
      dispatch(actions.closeSseConnection());
    };
  }, [serverUrl]);

  return (
    <div className="App">
      <Switch>
        <Route path="/settings" exact>
          {editMode && (
            <>
              <NavBar
                isInEditMode={editMode}
                editModeHandler={() => dispatch(switchEditMode())}
              />
              <SettingsForm />
            </>
          )}
        </Route>
        <Route path="/" exact>
          <NavBar
            isInEditMode={editMode}
            editModeHandler={() => dispatch(switchEditMode())}
          />
          <RoomBuilder />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
