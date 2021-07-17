import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllItems, selectItems, selectErrorMessage } from './store';
import { initStreamingConnection } from './store/actions';

export const List = () => {
  const items = useSelector(selectItems);
  const error = useSelector(selectErrorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllItems());
    dispatch(initStreamingConnection());
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
