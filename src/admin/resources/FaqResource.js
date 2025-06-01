import { Faq } from "../../models/Faq.js";

export const FaqResource = {
  resource: Faq,
  options: {
    listProperties: ["id", "question", "answer", "show"],
    properties: {
      question: {
        position: 1,
      },
      answer: {
        position: 2,
      },
      show: {
        position: 3,
      },
    },
  },
};
