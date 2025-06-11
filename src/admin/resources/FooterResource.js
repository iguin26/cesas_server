import { Footer } from "../../models/Footer.js";

export const FooterResource = {
  resource: Footer,
  options: {
    properties: {
      id: {
        position: 1,
      },
      email: {
        position: 2,
      },
      phone: {
        position: 3,
      },
      whatsappLink: {
        position: 4,
      },
      facebookLink: {
        position: 5,
      },
      instagramLink: {
        position: 6,
      },
      youtubeLink: {
        position: 7,
      },
      siteLink: {
        position: 8,
      },
    },
    actions: {
      new: {
        isAccessible: false,
      },
      list: {
        showFilter: false,
      },
      delete: {
        isAccessible: false,
      },
      bulkDelete: { isAccessible: false }
    },
  },
};
