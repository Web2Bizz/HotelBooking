import { router } from "../trpc";
import { adminRouter } from "./admin";
import { clientRouter } from "./client";
import { publicRouter } from "./public";

export const appRouter = router({
    adminRouter,
    clientRouter,
    publicRouter
})

export type AppRouter = typeof appRouter;