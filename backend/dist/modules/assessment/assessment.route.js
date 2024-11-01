"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assessmentRoutes = assessmentRoutes;
async function assessmentRoutes(app) {
    app.get("/", {
        preHandler: [app.authenticate],
    }, (req, reply) => {
        reply.send({ message: "assessment route" });
    });
    app.log.info("assessment routes registered");
}
