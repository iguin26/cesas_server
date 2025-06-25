
import { Event } from "../../models/Event.js";

export const EventResource = {
  resource: Event,
  options: {
    listProperties: ["id","text"],
    properties: {
      text: {
        position: 2,
      },
    },

    actions: {
      new: { isAccessible: true},
      edit: {isAccessible: true},
      delete: { isAccessible: true},
    },
  },
};
