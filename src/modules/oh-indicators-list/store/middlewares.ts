import { Middleware } from 'redux';

import { BASE_URL } from '../network-layer/constants';
import {
  IEventSourceInitializer,
  IEventSourceFinalizer,
} from '../network-layer/sseClient';
import { 
  sseConnectionClosed, 
  sseConnectionOpened, 
  receiveMessage, 
  startSseConnection } from './actions';
import { RootState } from '../../../store';

export const sseMiddleware =
  (
    client: IEventSourceInitializer & IEventSourceFinalizer,
  ): Middleware<unknown, RootState> =>
  (store) =>
  (next) =>
  (action) => {
    if (action.type === 'items/sse/connection/init') {
      store.dispatch(startSseConnection());
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
          onOpenHandler: () => store.dispatch(sseConnectionOpened()),
          onErrorHandler: () => store.dispatch(sseConnectionClosed()),
        },
      );

      return;
    }

  if (action.type === 'items/sse/connection/close') {
    client.destroy();

      return store.dispatch(sseConnectionClosed());
    }

    return next(action);
  };
