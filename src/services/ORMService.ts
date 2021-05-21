import { Service} from "@tsed/di";
import {AfterRoutesInit, Injectable} from "@tsed/common";
import {TypeORMService} from "@tsed/typeorm";
import { Connection, EntityTarget } from "typeorm";
import { Calendar } from "../models/Calendar.entity";

import "reflect-metadata";

@Service()
@Injectable()
export class ORMService  implements AfterRoutesInit {
  public connection: Connection;
  constructor(private typeORMService: TypeORMService) {
  }
  $afterRoutesInit() {
    this.connection = this.typeORMService.get("default")!; // get connection by name
  }

  async get(): Promise<Connection> {
      return this.connection;
  }

  async upsert<T>(dataEntityInstance: T): Promise<T | undefined> {
    try {
      const result = await this.connection.manager.save<T>(dataEntityInstance);
      console.log("Succesfully created.");
      return result;
    }
    catch (e) {
      console.log("Failed creating.");
      console.log(e);
    }
  }

  async update<T>(dataEntityInstance: T): Promise<T | undefined> {
    try {
      const result = await this.connection.manager.save<T>(dataEntityInstance);
      console.log("Succesfully updated.");
      return result;
    }
    catch (e) {
      console.log("Failed updating.");
      console.log(e);
    }
  }


  public getSettings() {
    return "444";
  }
}