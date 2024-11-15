import { JWT } from "@fastify/jwt";
import { User } from "@prisma/client";

declare module "fastify" {
  export interface FastifyInstance {
    config: {
      FRONTEND_URL: string;
      JWT_SECRET: string;
      DATABASE_URL: string;
    };
    authenticate: any;
    isAdmin: any;
  }
  export interface FastifyRequest {
    jwt: JWT;
  }
}

type UserPayload = {
  id: number;
  username: string;
  role: string;
};

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: UserPayload;
  }
}
