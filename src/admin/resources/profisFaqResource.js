import {ProfisFaq} from "../../models/profisFaq.js";

export const ProfisFaqResource = {
  resource: ProfisFaq,
  options: {
    listProperties: ["id", "question", "answer"],
    properties: {
      question: {
        position: 1,
      },
      answer: {
        position: 2,
      },
    },
  },
};
