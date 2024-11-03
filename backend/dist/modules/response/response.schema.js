"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponseSchema = void 0;
exports.createResponseSchema = {
    body: {
        type: "object",
        properties: {
            entryId: { type: "string" },
            stepId: { type: "string" },
            inputId: { type: "string" },
            value: { type: "string" },
        },
    },
};
