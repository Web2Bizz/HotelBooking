import { publicProcedure, router } from "../../trpc";
import { User } from "../../types";
import z from "zod";

export const logoutRouter = router({
  logout: publicProcedure.input(z.string()).query(() => {})
});
