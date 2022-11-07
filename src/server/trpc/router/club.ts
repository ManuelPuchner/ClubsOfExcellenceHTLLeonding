import { t, authedProcedure, administratorPocedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Club, QandA, User, UserRole } from "generated/client";

type ClubInfo = Club & {
  admin: User;
  qanda: QandA[];
};

export const clubRouter = t.router({
  createClub: authedProcedure
    .input(
      z.object({
        clubname: z.string(),
        image: z.string(),
        description: z.string(),
        qanda: z.array(
          z.object({
            question: z.string(),
            answer: z.string(),
          })
        ),
        adminId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
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
  setClubApproval: administratorPocedure
    .input(
      z.object({
        clubId: z.string(),
        approved: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const club = await ctx.prisma.club.update({
        where: {
          id: input.clubId,
        },
        data: {
          isApproved: input.approved,
        },
      });
      return club.isApproved;
    }),
  getClubByName: authedProcedure
    .input(z.string())
    .query(async ({ ctx, input: clubName }) => {
      const dbclub = await ctx.prisma.club.findUnique({
        where: {
          clubname: clubName,
        },
        include: {
          qanda: true,
          admin: true,
        },
      });

      if (clubName === undefined || dbclub === null || dbclub === undefined) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Club not found",
        });
      }

      if (
        !dbclub.isApproved &&
        ctx.session?.user?.role != UserRole.ADMINISTRATOR
      ) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Club not approved",
        });
      }

      const clubInfo: ClubInfo = JSON.parse(JSON.stringify(dbclub));

      return clubInfo;
    }),
});
