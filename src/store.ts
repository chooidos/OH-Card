import { configureStore } from '@reduxjs/toolkit';
import { BASE_URL } from './modules/oh-indicators-list/network-layer/constants';

import indicatorsSlice from './modules/oh-indicators-list/store/slice';

// todo: move to a separate place
const parseStreamingResponse = (incomingMessage: MessageEvent): { name: string, value: any } => {
  const data = JSON.parse(incomingMessage.data);
  const [,,name] = data.topic.split('/');
  const { value } = JSON.parse(data.payload);
  return { name, value };
};

const sseMiddleware = () => (store: any) => (next: any) => (action: any) => {
  let events: any;
  if (action.type==='items/sse/connection/init') {
    events = new EventSource(`${BASE_URL}/rest/events?topics=openhab/items/*/statechanged,openhab/items/*/*/statechanged`);
    console.log(events);
    
    events.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      if (data.type === 'ItemStateChangedEvent') {
        return store.dispatch({
          type: 'items/sse/message/received',
          payload: parseStreamingResponse(event),
        });
      }
    };
    events.onopen = () => {
      return store.dispatch({
        type: 'items/sse/connection/opened'
      })
    };
    events.onerror = () => {
      console.log('onrerror');
      
      events.close();
      return store.dispatch({
        type: 'items/sse/connection/closed'
      })
    };
  }
  console.log(events);
  if (action.type==='items/sse/connection/close'){
    events?.close();
    return store.dispatch({
      type: 'items/sse/connection/closed'
    })
  }
  return next(action);
}

export const store = configureStore({
  reducer: {
    indicators: indicatorsSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['sse'],
    },
  }).concat(sseMiddleware()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
