/**
 *
 * Types
 *
 */
type EVENT_KEY = 'add_album' | 'test';
interface EVENT_BODY {
  name: string;
  artist: string;
  thumbnail: string;
  releaseYear: number;
}

/**
 *
 * Functions
 *
 */
export const jukeboxEvents = {
  dispatch: (eventKey: EVENT_KEY, eventBody: EVENT_BODY) => {
    const event = new CustomEvent(eventKey, { detail: eventBody });
    window.dispatchEvent(event);
  },
  attach: (eventKey: EVENT_KEY, callback: EventListener) => {
    window.addEventListener(eventKey, callback);
  },
  cleanup: (eventKey: EVENT_KEY, callback: EventListener) => {
    window.removeEventListener(eventKey, callback);
  },
};
