"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assessmentRoutes = assessmentRoutes;
const assessment_controller_1 = require("./assessment.controller");
const assessment_schema_1 = require("./assessment.schema");
async function assessmentRoutes(app) {
    app.get("/:type/:version", 
    // {
    //   preHandler: [app.authenticate],
    // },
    assessment_controller_1.getAssessmentByTypeAndVersion);
    app.post("/", {
        preHandler: [app.authenticate, app.isAdmin],
        schema: assessment_schema_1.createAssessmentSchema,
    }, assessment_controller_1.createAssessment);
    app.log.info("assessment routes registered");
}
