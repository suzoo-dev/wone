"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = createResponse;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const crypto_1 = require("crypto");
async function createResponse(req, reply) {
    const { responses } = req.body;
    const entryId = (0, crypto_1.randomUUID)();
    const responseData = responses.map((response) => ({
        entryId,
        stepId: response.stepId,
        inputId: response.inputId,
        userId: 5, // req.user.id,
        value: response.value,
    }));
    const createdResponse = await prisma_1.default.response.createMany({
        data: responseData,
    });
    reply.send(createdResponse);
}
