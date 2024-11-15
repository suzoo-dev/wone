"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseRoutes = responseRoutes;
const response_controller_1 = require("./response.controller");
const response_schema_1 = require("./response.schema");
async function responseRoutes(app) {
    app.post("/", {
        // preHandler: [app.authenticate],
        schema: response_schema_1.createResponseSchema,
    }, response_controller_1.createResponse);
    app.log.info("response routes registered");
}
