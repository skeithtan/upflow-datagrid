// NOTE: Load environmental variables -- must come first
import "dotenv/config";
import { logger } from "./utils/logger";
import * as routers from "./routers";
import Koa from "koa";
import cors from "@koa/cors";
import { routerErrorHandler } from "./utils/routerErrorHandler";

export const app = new Koa();

function handleApplicationError(error: Error) {
  logger.error(`Server error: `, error);
}

async function main() {
  const { SERVER_PORT, SERVER_CORS_ORIGIN } = process.env;
  logger.info("Starting server...");

  // Register error handlers
  app.on("error", handleApplicationError);
  app.use(routerErrorHandler);

  // Register CORS
  app.use(cors({ origin: SERVER_CORS_ORIGIN }));

  // Register routers to app
  Object.values(routers).forEach((router) => {
    app.use(router.routes());
    app.use(router.allowedMethods());
  });

  app.listen(SERVER_PORT);
  logger.info(`Server is listening on port ${SERVER_PORT}`);
}

main().then();