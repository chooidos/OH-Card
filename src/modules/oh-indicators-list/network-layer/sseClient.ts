import EventSource from 'eventsource';

export default class SseClient {
  source: EventSource | undefined;

  connect = (url: string): Promise<any> => {
    this.source = new EventSource(url);
    return new Promise((resolve, reject) => {
      this.source!.onopen = resolve;
      this.source!.onerror = () => {
        this.source?.close();
        reject();
      };
    });
  };

  disconnect = (): Promise<void> => {
    return new Promise(resolve => {
      this.source?.close();
      this.source = undefined;
      resolve();
    });
  };

  on = (event: string, callback: (x: any) => void): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!this.source) {
        reject("No EventSource active at the moment.");
      }
      this.source!.addEventListener(event, callback);
      resolve();
    });
  };

  emit = (event: any) => {
    return this.source?.dispatchEvent(event);
  };
}
