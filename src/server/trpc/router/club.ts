import { t, authedProcedure } from "../trpc";
import { z } from "zod";

export const clubRouter = t.router({
  createClub: authedProcedure.input(z.object({
    clubname: z.string(),
    image: z.string(),
    description: z.string(),
    qanda: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })),
    adminId: z.string(),
  })).mutation(({ ctx, input }) => {
    console.log('====================================');
    console.log(input);
    console.log('====================================');
    return ctx.prisma.club.create({
      data: {
        clubname: input.clubname,
        image: input.image,
        description: input.description,
        qanda: {
          createMany: {
            data: input.qanda,
          }
        },
        adminId: input.adminId,
      },
    });
  }),
});
