import { env } from "process";
import { appRouter } from "./routes";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { log, error } from "console";
import dotenv from "dotenv";

export type { AppRouter } from "./routes";

export const runTRPCServer = () => {
  if (env.PORT === undefined) throw Error("PORT env not defined");

  createHTTPServer({
    router: appRouter,
  }).listen(env.PORT);
};

const main = async (): Promise<void> => {
  dotenv.config({ path: `.env.${env.NODE_ENV}` });

  log(`Server started on ${env.NODE_ENV} mode`);

  runTRPCServer();
};

main().catch(error);
