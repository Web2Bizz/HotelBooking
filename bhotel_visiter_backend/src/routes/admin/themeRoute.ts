import { z } from "zod";
import { publicProcedure, router } from "../../trpc";

export const themeRoute = router({
  setTheme: publicProcedure.input(z.string()).query(() => {}),
  getTheme: publicProcedure.query((): string => ""),
});
