export const createResponseSchema = {
  body: {
    type: "object",
    properties: {
      responses: {
        type: "array",
        items: {
          type: "object",
          properties: {
            stepId: { type: "string" },
            inputId: { type: "string" },
            value: { type: "string" },
          },
          required: ["stepId", "inputId", "value"],
        },
      },
    },
    required: ["responses"],
  },
};
