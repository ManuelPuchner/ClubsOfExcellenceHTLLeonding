import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import filenamify from "filenamify";
import { env } from "src/env/server.mjs";

interface NextConnectApiRequest extends NextApiRequest {
  files: Express.Multer.File[];
  file: Express.Multer.File;
}

const outputFolderName = env.NODE_ENV === "production" ? "" : "./public/uploads";
const TEM_MB = 1024 * 1024 * 10;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, outputFolderName);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      new Date().toISOString().replace(/:|\./g, "-") +
      "_" +
      Math.round(Math.random() * 1e9);

    const filename = `${uniqueSuffix}_${filenamify(file.originalname, {
      replacement: "-",
    }).replace(/ /g, "-")}`;

    cb(null, filename);
  },
});

const upload = multer({
  limits: {
    fileSize: TEM_MB,
  },
  storage: storage,
  fileFilter: (req, file, cb) => {
    const acceptFile: boolean = ["image/jpeg", "image/png"].includes(
      file.mimetype
    );
    cb(null, acceptFile);
  },
});

const apiRoute = nextConnect({
  onError(error, req: NextConnectApiRequest, res: NextApiResponse) {
    console.log("error", error);
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextConnectApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("image"));

apiRoute.post((req: NextConnectApiRequest, res: NextApiResponse) => {
  const imagePathClient = req.file.path.replace("public", "");
  return res.status(200).json({ message: "success", path: imagePathClient });
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
export default apiRoute;
