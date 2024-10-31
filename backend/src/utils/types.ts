import fastify from "fastify";
import { JWT } from "@fastify/jwt";

declare module "fastify" {
  export interface FastifyInstance {
    config: {
      JWT_SECRET: string;
      DATABASE_URL: string;
    };
  }
  export interface FastifyRequest {
    jwt: JWT;
  }
}
