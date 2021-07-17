import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllItems, selectItems, selectErrorMessage } from './store';
import { initSseConnection, sseitems } from './network-layer/fetchClient';
import { BASE_URL } from './network-layer/constants';

export const List = () => {
  const items = useSelector(selectItems);
  const error = useSelector(selectErrorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllItems());
    sseitems(dispatch);
    dispatch(initSseConnection(`${BASE_URL}/rest/events?topics=openhab/items/*/statechanged,openhab/items/*/*/statechanged`));
  }, []);

  return (
    <div className="App">
      {error}
      <ul>
        {Object.keys(items).map(itemKey => <li key={items[itemKey].name}>{items[itemKey].name}</li> )}
      </ul>
    </div>
  );
}
