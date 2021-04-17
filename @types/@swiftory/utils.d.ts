declare module '@swiftory/utils' {
  export type EventKey = 'swiftory:found_album' | 'swiftory:test';
  export type EventBody =
    | {
        albumKey: string;
      }
    | { test: string };

  export interface EventMethods {
    dispatch: (eventKey: EventKey, eventBody: EventBody) => void;
    attach: (eventKey: EventKey, callback: EventListener) => void;
    cleanup: (eventKey: EventKey, callback: EventListener) => void;
  }

  const jukeboxEvents: EventMethods;

  const CDN_URL: string;

  const preloadImages: (
    arrayOfImgSrc: string[],
    percentUpdatedCallback?: (number) => void
  ) => Promise<HTMLImageElement[]>;
}
