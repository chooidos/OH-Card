export interface IEventSourceInitializer {
    init: (
        x: string,
        z: {
            onMessageHandler: (y: any) => void,
            onOpenHandler: (y: any) => void,
            onErrorHandler: (y: any) => void,
        }
    ) => void
}

export interface IEventSourceFinalizer {
    destroy: () => void
}

export default class {
    // TODO implementation
}