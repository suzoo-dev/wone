"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAssessmentSchema = void 0;
exports.createAssessmentSchema = {
    body: {
        type: "object",
        properties: {
            version: { type: "string" },
            type: { type: "string" },
            steps: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        subtitle: { type: "string" },
                        type: { type: "string" },
                        inputs: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    label: { type: "string" },
                                    required: { type: "boolean" },
                                    inputType: { type: "string" },
                                    options: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                label: { type: "string" },
                                                value: { type: "string" },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
