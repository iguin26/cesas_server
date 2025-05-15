// import { User } from "../../models/User.js";

// export const UserResource = {
//   resource: User,
//   options: {
//     id: "users",
//     href: ({ h, resource }) => {
//       return h.resourceActionUrl({
//         resourceId: resource.decorate().id(),
//         actionName: "list",
//         params: {
//           "filters.status": "active",
//         },
//       });
//     },
//   },
// };

// const UserResource2 = {
//   resource: User,
//   options: {
//     sort: {
//       sortBy: "updatedAt",
//       direction: "desc",
//     },
//   },
// };
