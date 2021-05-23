import {Controller, Get, Patch, Post, BodyParams, Inject, PathParams, HeaderParams} from "@tsed/common";
import { Game } from "../models/Game";
import { TokenHeader } from "../models/Session";
import { GameService } from "../services/GameService";
import { SessionService } from '../services/SessionService';

@Controller("/games")
export class GameController {
  @Inject()
  gameService: GameService;
  @Inject()
  sessionService: SessionService;

  @Post()
  async createNewGame(@BodyParams() body: {rows: number, columns: number, amountOfMines: number}, @HeaderParams() header: TokenHeader): Promise<Game | undefined> {
    const {rows, columns, amountOfMines} = body;
    const userId = await this.sessionService.gatherUserIdByToken(header.authentication);
    const result = await this.gameService.createNewGame(rows, columns, amountOfMines, userId);
    return result;
  }

  @Get()
  async findAll(@HeaderParams() header: TokenHeader): Promise<Game[]> {
    const userId = await this.sessionService.gatherUserIdByToken(header.authentication);
    const result = await this.gameService.findAll(userId);
    return result;
  }
  
  @Get("/ongoing")
  async findAllNotFinished(@HeaderParams() header: TokenHeader): Promise<Game[]> {
    const userId = await this.sessionService.gatherUserIdByToken(header.authentication);
    const result = await this.gameService.findAllNotFinished(userId);
    return result;
  }

  @Get("/:id")
  async find(@HeaderParams() header: TokenHeader, @PathParams() params: {id: string}): Promise<Game> {
    const userId = await this.sessionService.gatherUserIdByToken(header.authentication);
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