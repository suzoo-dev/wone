"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const env_1 = __importDefault(require("@fastify/env"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const cors_1 = __importDefault(require("@fastify/cors"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const user_route_1 = require("./modules/user/user.route");
const assessment_route_1 = require("./modules/assessment/assessment.route");
const response_route_1 = require("./modules/response/response.route");
const schema = {
    type: "object",
    properties: {
        JWT_SECRET: { type: "string" },
        DATABASE_URL: { type: "string" },
        FRONTEND_URL: { type: "string", default: "http://localhost:5173" },
    },
    required: ["JWT_SECRET", "DATABASE_URL", "FRONTEND_URL"],
};
const options = {
    confKey: "config",
    schema,
    data: process.env,
    dotenv: {
        path: `${__dirname}/.env`,
        debug: true,
    },
};
async function buildServer() {
    const server = (0, fastify_1.default)({ logger: true });
    await server.register(env_1.default, options);
    server.register(cors_1.default, {
        origin: server.config.FRONTEND_URL,
        credentials: false,
    });
    server.register(jwt_1.default, { secret: server.config.JWT_SECRET });
    server.register(cookie_1.default, {
        secret: server.config.JWT_SECRET,
        hook: "preHandler",
    });
    server.register(user_route_1.userRoutes, { prefix: "api/user" });
    server.register(assessment_route_1.assessmentRoutes, { prefix: "api/assessment" });
    server.register(response_route_1.responseRoutes, { prefix: "api/response" });
    server.addHook("preHandler", (req, res, next) => {
        req.jwt = server.jwt;
        return next();
    });
    server.decorate("authenticate", async (req, reply) => {
        const token = req.cookies.access_token;
        if (!token) {
            return reply.status(401).send({ message: "Authentication required" });
        }
        const decoded = req.jwt.verify(token);
        req.user = decoded;
    });
    server.decorate("isAdmin", async (req, reply) => {
        if (req.user.role !== "ADMIN") {
            return reply
                .status(403)
                .send({ message: "Access denied: Admins only" });
        }
    });
    server.get("/healthcheck", async (request, reply) => {
        reply.send({ message: "Success" });
    });
    return server;
}
async function start() {
    try {
        const server = await buildServer();
        await server.listen({ port: 8080 });
        console.log(`Server listening on ${8080}`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}
start();
