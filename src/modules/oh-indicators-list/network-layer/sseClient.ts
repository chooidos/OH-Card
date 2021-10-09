interface IEventHandlers {
  onMessageHandler: (event: MessageEvent) => void;
  onOpenHandler: () => void;
  onErrorHandler: () => void;
}
export interface IEventSourceInitializer {
  init: (
    url: string,
    eventHandlers: IEventHandlers,
  ) => void;
}

export interface IEventSourceFinalizer {
  destroy: () => void;
}

export const parseStreamingResponse = (
  incomingMessage: MessageEvent,
): { name: string; value: string } => {
  const data = JSON.parse(incomingMessage.data);
  const [, , name] = data.topic.split('/');
  const { value } = JSON.parse(data.payload);
  return { name, value };
};

export default class SseClient {
  source: EventSource | undefined;
  init(url: string, eventHandlers: IEventHandlers) {
    this.source = new EventSource(url);
    this.source.onmessage = event => eventHandlers.onMessageHandler(event);
    this.source.onopen = () => eventHandlers.onOpenHandler();
    this.source.onerror = () => {
      eventHandlers.onErrorHandler();
      this.source?.close()
    }
  }
  destroy() {
    this.source?.close();
    this.source = undefined;
  }
}
