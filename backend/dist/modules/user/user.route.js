"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = userRoutes;
const user_controller_1 = require("./user.controller");
async function userRoutes(app) {
    app.post("/login", {
        schema: {
            body: {
                type: "object",
                properties: {
                    username: { type: "string" },
                },
                required: ["username"],
            },
        },
    }, user_controller_1.login);
    app.log.info("user routes registered");
}
