import { EjaFaq } from "../../models/ejaFaq.js";

export const EjaFaqResource = {
  resource: EjaFaq,
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
