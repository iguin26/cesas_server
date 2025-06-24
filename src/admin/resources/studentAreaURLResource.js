
import { studentAreaURL } from "../../models/studentAreaURL.js";


export const studentAreaURLResource = {
    resource: studentAreaURL,
    options: {
        listProperties: ["id", "URL"],
        actions: {
            edit: {
                isAccessible: true
            },
            delete: { isAccessible: false },
            new: { isAccessible: true },
            bulkDelete: { isAccessible: false },
        },
    },
};