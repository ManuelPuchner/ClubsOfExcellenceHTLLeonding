export const config = {
  api: { externalResolver: true },
}

import express from "express";
const handler = express();

const serveFiles = express.static("public")

handler.use(['/api/images', '/images'], serveFiles);

export default handler;