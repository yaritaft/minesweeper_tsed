import { Service} from "@tsed/di";
import {AfterRoutesInit, Injectable} from "@tsed/common";
import {TypeORMService} from "@tsed/typeorm";
import { Connection } from "typeorm";
import { Calendar } from "../models/Calendar.entity";

import "reflect-metadata";
import { ORMService } from "./ORMService";

@Service()
@Injectable()
export class GameService {
  private connection: Connection;

  constructor(private ormService: ORMService) {

  }
  async find(): Promise<Calendar[]> {
    let aCalendar = new Calendar();
    aCalendar._id="444";
    await this.connection.manager.save(aCalendar).catch(e=>{console.log(e)});
    const calendars = await this.connection.manager.getRepository(Calendar).find({});
    console.log("Loaded users: ", calendars);

    return calendars;
  }


  public getSettings() {
    return "444";
  }
}