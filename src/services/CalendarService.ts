import {Configuration, Constant, Service} from "@tsed/di";
import {AfterRoutesInit, BeforeRoutesInit, Injectable} from "@tsed/common";
import {TypeORMService} from "@tsed/typeorm";
import { Connection } from "typeorm";
import { Calendar } from "../models/Calendar.entity";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

import "reflect-metadata";

@Service()
@Injectable()
export class CalendarService  implements AfterRoutesInit {
  private connection: Connection;

  constructor(private typeORMService: TypeORMService) {

  }



  $afterRoutesInit() {
    this.connection = this.typeORMService.get("default")!; // get connection by name
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