import { Service } from "@tsed/di";
import { Injectable } from "@tsed/common";
import { Connection } from "typeorm";
import { Calendar } from "../models/Calendar.entity";

import "reflect-metadata";
import { ORMService } from "./ORMService";
import { Cell, CellCoordinates, CellState, Game, GameState } from "../models/Game.entity";
import { GameCoreService } from "../core/GameCore";

@Service()
@Injectable()
export class GameService {
  private connection: Connection;

  constructor(private ormService: ORMService, gameCoreService: GameCoreService) {}
  async find(): Promise<Calendar[]> {
    let aCalendar = new Calendar();
    aCalendar._id = "444";
    await this.connection.manager.save(aCalendar).catch((e) => {
      console.log(e);
    });
    const calendars = await this.connection.manager.getRepository(Calendar).find({});
    console.log("Loaded users: ", calendars);

    return calendars;
  }

  public getSettings() {
    return "444";
  }
}
