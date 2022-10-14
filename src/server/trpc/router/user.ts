import { t, authedProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = t.router({
  searchUserByEMail: authedProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const email = input.email.split(" ").join("&");
      return ctx.prisma.user.findMany({
        take: 4,
        orderBy: {
          _relevance: {
            fields: ["email"],
            search: email,
            sort: "desc",
          }
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          image: true,
          name: true,
        },
      });
    }),
});
