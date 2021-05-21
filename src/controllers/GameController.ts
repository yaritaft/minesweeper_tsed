import {Controller, Get, Patch, Post, BodyParams, Inject, PathParams, HeaderParams} from "@tsed/common";
import { Game } from "../models/Game.entity";
import { GameService } from "../services/GameService";
import { SessionService } from '../services/SessionService';

@Controller("/games")
export class GameController {
  @Inject()
  gameService: GameService;
  sessionService: SessionService;

  @Post()
  async createNewGame(@BodyParams() body: {rows: number, columns: number, amountOfMines: number}): Promise<Game | undefined> {
    const {rows, columns, amountOfMines} = body;
    const result = await this.gameService.createNewGame(rows, columns, amountOfMines);
    return result;
  }

  @Get()
  async findAll(@HeaderParams() header: {Authentication: string}): Promise<Game[]> {
    const userId = await this.sessionService.gatherUserIdByToken(header.Authentication);
    const result = await this.gameService.findAll(userId);
    return result;
  }
  
  @Get("/ongoing")
  async findAllNotFinished(@HeaderParams() header: {Authentication: string}): Promise<Game[]> {
    const userId = await this.sessionService.gatherUserIdByToken(header.Authentication);
    const result = await this.gameService.findAllNotFinished(userId);
    return result;
  }

  @Get("/:id")
  async find(@HeaderParams() header: {Authentication: string}, @PathParams() params: {id: string}): Promise<Game> {
    const userId = await this.sessionService.gatherUserIdByToken(header.Authentication);
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
}