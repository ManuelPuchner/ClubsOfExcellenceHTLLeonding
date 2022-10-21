import { t, authedProcedure } from "../trpc";
import { z } from "zod";
import { env } from "../../../env/server.mjs";
import Mail from "nodemailer/lib/mailer";
import { createTransport } from "nodemailer";
import { getMailHtml } from "../../../utils/mailhtml";
import { randomUUID } from "crypto";
import { getBaseUrl } from "../../../utils/trpc";
import { UserRole } from "generated/client";

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
  })).mutation(async ({ ctx, input }) => {
    // TODO: add oauth
    // const emailAuthToken = generateAuthToken(input.email);
    // const authUrl = `${getBaseUrl()}/auth/verify-email?token=${emailAuthToken}`;
    // const mailOptions: Mail.Options = {
    //   from: `Clubs Of Excellence Auth <${env.GOOGLE_EMAIL}>`,
    //   to: input.email,
    //   subject: "Welcome to Clubs of Excellence!",
    //   text: `Welcome to Clubs of Excellence, ${input.firstname}! Klicke ${null} um deine Email zu verifizieren.`,
    //   html: getMailHtml(input.firstname, authUrl),
    // };
    // const accessToken = (await ctx.oAuth2Client.getAccessToken()).token;
    // if(!accessToken) {
    //   throw new Error("No access token");
    // }
    // const transporter = createTransport(getTransporterConfig(accessToken));
    // transporter.sendMail(mailOptions);
    // return ctx.prisma.user.update({
    //   where: {
    //     id: ctx.session?.user.id,
    //   },
    //   data: {
    //     customUsername: input.username,
    //     firstname: input.firstname,
    //     lastname: input.lastname,
    //     email: input.email,
    //     phoneNumber: input.phone,
    //     isNewUser: false,
    //     emailVerificationToken: emailAuthToken,
    //   },
    // });
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
        role: UserRole.STUDENT,
        emailVerified: new Date(),
        emailVerificationToken: null
      },
    });
  }),
});

const generateAuthToken = (email: string) => {
  return randomUUID();
}