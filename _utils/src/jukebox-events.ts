import { EventMethods } from '@swiftory/utils';

export const jukeboxEvents: EventMethods = {
  dispatch: (eventKey, eventBody) => {
    if (!eventKey) {
      throw new TypeError('Invalid event key.');
    }
    if (!eventBody) {
      throw new TypeError('Invalid event body for dispatch.');
    }

    console.log('jukeboxEvents dispatch');
    const event = new CustomEvent(eventKey, { detail: eventBody });
    window.dispatchEvent(event);
  },
  attach: (eventKey, callback) => {
    if (!eventKey) {
      throw new TypeError('Invalid event key.');
    }
    if (!callback) {
      throw new TypeError('A callback is required to attach to an event.');
    }

    console.log('jukeboxEvents attach');
    window.addEventListener(eventKey, callback);
  },
  cleanup: (eventKey, callback) => {
    if (!eventKey) {
      throw new TypeError('Invalid event key.');
    }
    if (!callback) {
      throw new TypeError('A callback is required to clean up from an event.');
    }

    console.log('jukeboxEvents cleanup');
    window.removeEventListener(eventKey, callback);
  },
};
