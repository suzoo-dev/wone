"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const prisma_1 = __importDefault(require("../../utils/prisma"));
async function login(req, reply) {
    const { username } = req.body;
    const user = await prisma_1.default.user.findUnique({ where: { username } });
    if (!user) {
        return reply.code(404).send({ message: "User not found" });
    }
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
    };
    const token = req.jwt.sign(payload);
    reply.setCookie("access_token", token, {
        path: "/",
        httpOnly: true,
        secure: true,
    });
    return { accessToken: token };
}
