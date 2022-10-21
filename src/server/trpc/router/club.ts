import { t, authedProcedure, administratorPocedure } from "../trpc";
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
          },
        },
        adminId: input.adminId,
      },
    });
  }),
  getAllClubs: authedProcedure.query(({ ctx }) => {
    return ctx.prisma.club.findMany();
  }),
  getAllApprovedClubs: t.procedure.query(({ ctx }) => {
    return ctx.prisma.club.findMany({
      where: {
        isApproved: true,
      },
    });
  }),
  setClubApproval: administratorPocedure.input(z.object({
    clubId: z.string(),
    approved: z.boolean()
  })).mutation(async ({ ctx, input }) => {
    const club = await ctx.prisma.club.update({
      where: {
        id: input.clubId,
      },
      data: {
        isApproved: input.approved,
      },
    });
    return club.isApproved;
  })
});
