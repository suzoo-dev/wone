"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = createResponse;
const prisma_1 = __importDefault(require("../../utils/prisma"));
async function createResponse(req, reply) {
    const { entryId, stepId, inputId, value } = req.body;
    const createdResponse = await prisma_1.default.response.create({
        data: {
            entryId,
            stepId,
            inputId,
            userId: req.user.id,
            value,
        },
    });
    reply.send(createdResponse);
}
