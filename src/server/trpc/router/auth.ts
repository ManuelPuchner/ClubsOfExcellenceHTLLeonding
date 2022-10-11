import { t, authedProcedure } from "../trpc";
import { z } from "zod";

export const authRouter = t.router({
  getSession: t.procedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: authedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
  updateNewUser: authedProcedure.input(z.object({
    username: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    email: z.string(),
    phone: z.string(),
  })).mutation(({ ctx, input }) => {
    return ctx.prisma.user.update({
      where: {
        id: ctx.session?.user.id,
      },
      data: {
        customUsername: input.username,
        firstname: input.firstname,
        lastname: input.lastname,
        email: input.email,
        phoneNumber: input.phone,
        isNewUser: false,
      },
    });
  }),
});
