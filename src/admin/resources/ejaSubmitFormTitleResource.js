import { ejaSubmitFormTitle } from "../../models/ejaSubmitFormTitle.js";
// import { pdfBeforeHook, pdfAfterHook } from "../actions/pdf.hook.js";

export const ejaSubmitFormTitleResource = {
    resource: ejaSubmitFormTitle,
    options: {
        listProperties: ["id", "name"],
        actions: {
            edit: {
                // before: [pdfBeforeHook],
                // after: [pdfAfterHook],
                isAccessible: true
            },
            delete: { isAccessible: false },
            new: { isAccessible: false },
            bulkDelete: { isAccessible: false },
        },
    },
};