import { profisSubmitFormTitle } from "../../models/profisSubmitFormTitle.js";
// import { pdfBeforeHook, pdfAfterHook } from "../actions/pdf.hook.js";

export const profisSubmitFormTitleResource = {
    resource: profisSubmitFormTitle,
    options: {
        listProperties: ["id", "name"],
        actions: {
            edit: {
                // before: [pdfBeforeHook],
                // after: [pdfAfterHook],
                isAccessible: true
            },
            delete: { isAccessible: false },
            new: { isAccessible: true },
            bulkDelete: { isAccessible: false },
        },
    },
};