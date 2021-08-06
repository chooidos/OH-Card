import { Middleware } from 'redux';

import { BASE_URL } from '../network-layer/constants';
import {
  IEventSourceInitializer,
  IEventSourceFinalizer,
} from '../network-layer/sseClient';
import { connectionClosed, connectionOpened, receiveMessage, startConnection } from './actions';
import { RootState } from '../../../store';

export const sseMiddleware =
  (
    client: IEventSourceInitializer & IEventSourceFinalizer,
  ): Middleware<unknown, RootState> =>
  (store) =>
  (next) =>
  (action) => {
    if (action.type === 'items/sse/connection/init') {
      store.dispatch(startConnection());
      client.init(
        // TODO make it configurable
        `${BASE_URL}/rest/events?topics=openhab/items/*/statechanged,openhab/items/*/*/statechanged`,
        {
          onMessageHandler: (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'ItemStateChangedEvent') {
              return store.dispatch(receiveMessage(event));
            }
          },
          onOpenHandler: () => store.dispatch(connectionOpened()),
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
