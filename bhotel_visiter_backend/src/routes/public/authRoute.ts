import { publicProcedure, router } from "../../trpc";
import { User, Session } from "../../types";
import z from "zod";

const authModel = {
  login: z.string().email(),
  password: z.string(),
};

export const authRouter = router({
  authenticate: publicProcedure
    .input(z.object(authModel))
    .query((): Session | undefined => undefined),
});
