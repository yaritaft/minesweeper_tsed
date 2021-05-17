import {Configuration, Inject, PlatformApplication} from "@tsed/common";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import "@tsed/typeorm";
import {CalendarController} from "./controllers/CalendarController";
import { Calendar } from './models/Calendar.entity';
import { join } from "path";
const config = require("dotenv").config({path: "./.env"});


const rootDir = __dirname;

@Configuration({
  rootDir,
  debug: process.env.PORT !== undefined, // to check if it is dev
  "port": process.env.PORT || 8080,
  host : '0.0.0.0',
  acceptMimes: ["application/json"],
  mount: {
    // "/api": `./src/controllers/*.ts`, // using componentScan
    "/manual": [
      Calendar,
      CalendarController
    ]
  },
  componentsScan: [
    "${rootDir}/services/**/*.ts",
    "${rootDir}/services/**/*.js",
    "src/models/**/*.js",
    "./src/models/**/*.ts",
    `${rootDir}/services/**/**.{ts,js}`,
    `${rootDir}/models/**/**.{ts,js}`,
    `${rootDir}/models/*.js`,
  ],
  typeorm: [
    {
      name: "default",
      synchronize: true,
      type: "postgres",
      url: process.env.DATABASE_URL || config.DATABASE_URL,
      ssl: process.env.DATABASE_URL ? true : false,  // If env var is not set then it is dev
      "entities": [ "__dirname/**/*.entity.js", Calendar],
      "migrations": ["__dirname/migrations/**/*.js"],
      subscribers: [
        `${__dirname}/subscriber/*.js}`
      ]
    }
  ]
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