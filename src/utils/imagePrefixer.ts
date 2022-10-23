import { env } from "src/env/client.mjs";

export function getImagePath(oldPath: string | null): string {
  if (oldPath === null) return "";
  if (oldPath.startsWith("http")) return oldPath;
  return `${env.NEXT_PUBLIC_BASE_PATH}/api/images${oldPath}`;
}
