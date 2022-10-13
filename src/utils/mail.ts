import { env } from "../env/server.mjs";
import { google } from "googleapis";
import type { OAuth2Client } from "googleapis-common";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";

declare global {
  // eslint-disable-next-line no-var
  var oAuth2Client: OAuth2Client;
  // eslint-disable-next-line no-var
  var getTransporterConfig: (accessToken: string) => SMTPTransport.Options;
}

export const getTransporterConfig = (accessToken: string) => {
  const config: SMTPTransport.Options = {
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: env.GOOGLE_EMAIL,
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      refreshToken: env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken
    },
  };
  return config;
}

export const oAuth2Client =
  global.oAuth2Client ||
  new google.auth.OAuth2(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    env.GOOGLE_REDIRECT_URI
  );


if (env.NODE_ENV !== "production") {
  global.oAuth2Client = oAuth2Client;
  global.getTransporterConfig = getTransporterConfig;
}
