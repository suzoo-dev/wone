"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const user_route_1 = require("./modules/user/user.route");
const server = (0, fastify_1.default)({ logger: true });
server.get("/healthcheck", async (request, reply) => {
    reply.send({ message: "Success" });
});
server.register(user_route_1.userRoutes, { prefix: "api/user" });
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
