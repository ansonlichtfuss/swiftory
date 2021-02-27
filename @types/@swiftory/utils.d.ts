declare module '@swiftory/utils' {
  export type EventKey = 'swiftory:add_album' | 'swiftory:test';
  export type EventBody =
    | {
        name: string;
        artist: string;
        thumbnail: string;
        releaseYear: number;
      }
    | { test: string };

  export interface EventMethods {
    dispatch: (eventKey: EventKey, eventBody: EventBody) => void;
    attach: (eventKey: EventKey, callback: EventListener) => void;
    cleanup: (eventKey: EventKey, callback: EventListener) => void;
  }

  const jukeboxEvents: EventMethods;
}
