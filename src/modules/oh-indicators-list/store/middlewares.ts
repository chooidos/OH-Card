import { Middleware } from 'redux';

import { BASE_URL } from '../network-layer/constants';
import {
  IEventSourceInitializer,
  IEventSourceFinalizer,
} from '../network-layer/sseClient';
import { connectionClosed, connectionOpened, receiveMessage } from './actions';
import { RootState } from '../../../store';

// todo: types
export const sseMiddleware =
  (
    client: IEventSourceInitializer & IEventSourceFinalizer,
  ): Middleware<{}, RootState> =>
  (store) =>
  (next) =>
  (action) => {
    if (action.type === 'items/sse/connection/init') {
      client.init(
        // TODO make it configurable
        `${BASE_URL}/rest/events?topics=openhab/items/*/statechanged,openhab/items/*/*/statechanged`,
        {
          onMessageHandler: (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'ItemStateChangedEvent') {
              return store.dispatch(receiveMessage!(event));
            }
          },
          onOpenHandler: (event) => store.dispatch(connectionOpened(event)),
          onErrorHandler: () => store.dispatch(connectionClosed()),
        },
      );

      return;
    }

  if (action.type === 'items/sse/connection/close') {
    client.destroy();

      return store.dispatch(connectionClosed());
    }

    return next(action);
  };
