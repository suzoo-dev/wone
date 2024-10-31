import fastify from "fastify";
import { userRoutes } from "./modules/user/user.route";

const server = fastify({ logger: true });

server.get("/healthcheck", async (request, reply) => {
  reply.send({ message: "Success" });
});

server.register(userRoutes, { prefix: "api/user" });

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
