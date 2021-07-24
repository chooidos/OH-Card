export interface IEventSourceInitializer {
  init: (
    eventName: string,
    eventHandlers: {
      onMessageHandler: (event: MessageEvent) => void;
      onOpenHandler: () => void;
      onErrorHandler: (e: any) => void;
    },
  ) => void;
}

export interface IEventSourceFinalizer {
  destroy: () => void;
}

export default class {
    // TODO implementation
}