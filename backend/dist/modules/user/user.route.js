"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = userRoutes;
async function userRoutes(app) {
    app.get("/", (req, reply) => {
        reply.send({ message: "user route" });
    });
    app.log.info("user routes registered");
}
