import { FastifyReply, FastifyRequest } from "fastify";
import Prisma from "../../utils/prisma";

export async function login(
  req: FastifyRequest<{ Body: { username: string } }>,
  reply: FastifyReply
) {
  const { username } = req.body;

  const user = await Prisma.user.findUnique({ where: { username } });
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
