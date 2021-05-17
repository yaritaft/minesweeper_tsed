import {$log} from "@tsed/common";
import {PlatformExpress} from "@tsed/platform-express";
import {Server} from "./server";
const config = require("dotenv").config({path: "./.env"});


async function bootstrap() {
  try {
    $log.debug("Start server...");
    const platform = await PlatformExpress.bootstrap(Server, {
      DATABASE_URL: process.env.DATABASE_URL || config.DATABASE_URL,
      PORT: process.env.PORT || 8080
    });

    await platform.listen();
    $log.debug("Server initialized");
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();