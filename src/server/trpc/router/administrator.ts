import { t, administratorPocedure } from "../trpc";
import { z } from "zod";

export const clubRouter = t.router({
  test: administratorPocedure.query(() => {
    return "authenticated as administrator";
  })
});
