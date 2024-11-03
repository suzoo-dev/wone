export const createResponseSchema = {
  body: {
    type: "array",
    items: {
      type: "object",
      properties: {
        entryId: { type: "string" },
        stepId: { type: "string" },
        inputId: { type: "string" },
        value: { type: "string" },
      },
    },
  },
};
