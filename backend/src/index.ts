import fastify, { FastifyRequest, FastifyReply } from "fastify";
import fastifyEnv from "@fastify/env";
import fjwt, { FastifyJWT } from "@fastify/jwt";
import fCookie from "@fastify/cookie";
import { userRoutes } from "./modules/user/user.route";
import { assessmentRoutes } from "./modules/assessment/assessment.route";

const schema = {
  type: "object",
  properties: {
    JWT_SECRET: { type: "string" },
    DATABASE_URL: { type: "string" },
  },
  required: ["JWT_SECRET", "DATABASE_URL"],
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
  const server = fastify({ logger: true });

  await server.register(fastifyEnv, options);

  server.register(fjwt, { secret: server.config.JWT_SECRET });

  server.register(fCookie, {
    secret: server.config.JWT_SECRET,
    hook: "preHandler",
  });

  server.register(userRoutes, { prefix: "api/user" });
  server.register(assessmentRoutes, { prefix: "api/assessment" });

  server.addHook("preHandler", (req, res, next) => {
    req.jwt = server.jwt;
    return next();
  });

  server.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const token = req.cookies.access_token;

      if (!token) {
        return reply.status(401).send({ message: "Authentication required" });
      }
      const decoded = req.jwt.verify<FastifyJWT["user"]>(token);
      req.user = decoded;
    }
  );

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
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
