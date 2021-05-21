import {Controller, Get, Patch, Post, BodyParams, Injectable, Inject, QueryParams, PathParams} from "@tsed/common";
import { Game } from "../models/Game.entity";
import { GameService } from "../services/GameService";

@Controller("/games")
export class GameController {
  @Inject()
  gameService: GameService;

  @Post()
  async createNewGame(@BodyParams() body: {rows: number, columns: number, amountOfMines: number}): Promise<Game | undefined> {
    const {rows, columns, amountOfMines} = body;
    const result = await this.gameService.createNewGame(rows, columns, amountOfMines);
    return result;
  }

  @Get()
  async findAll(): Promise<Game[]> {
    // TODO: YARI ADD userId from token
    const userId = "aaa";
    const result = await this.gameService.findAll(userId);
    return result;
  }
  
  @Get("/ongoing")
  async findAllNotFinished(): Promise<Game[]> {
    // TODO: YARI ADD userId from token
    const userId = "aaa";
    const result = await this.gameService.findAllNotFinished(userId);
    return result;
  }

  @Get("/:id")
  async find(@PathParams() params: {id: string}): Promise<Game> {
    const userId = "aaa";
    const result = await this.gameService.findOne(params.id,userId);
    return result;
  }

  @Patch("/:id/click")
  async clickCell(@BodyParams() body: {x: number, y: number}, @PathParams() params: {id: string} ): Promise<Game | undefined> {
    const {x, y} = body;
    const result = await this.gameService.clickCell(params.id, x, y);
    return result;
  }
  @Patch("/:id/state")
  async switchState(@PathParams() params: {id: string}): Promise<Game> {
    const result = await this.gameService.switchState(params.id);
    return result;
  }
  @Patch("/click")
  clickCel2l(): string {
    return "This action returns all calendars";
  }
}