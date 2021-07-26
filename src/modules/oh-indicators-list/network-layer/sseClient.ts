export interface IEventSourceInitializer {
  init: (
    eventName: string,
    eventHandlers: {
      onMessageHandler: (event: MessageEvent) => void;
      onOpenHandler: (eventName: string) => void;
      onErrorHandler: (e: any) => void;
    },
  ) => void;
}

export interface IEventSourceFinalizer {
  destroy: (eventName: string) => void;
}

export default class {
    // TODO implementation
}