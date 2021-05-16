import {Configuration, Inject, PlatformApplication} from "@tsed/common";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import {Calendar} from "./src/controllers/Calendar";

const rootDir = __dirname;

@Configuration({
  rootDir,
  "port": process.env.PORT || 8080,
  acceptMimes: ["application/json"],
  mount: {
    // "/api": `./src/controllers/*.ts`, // using componentScan
    "/manual": [
      Calendar
    ]
  }
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */
  public $beforeRoutesInit(): void | Promise<any> {
    this.app
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
  }
}