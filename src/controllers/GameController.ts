import {Controller, Get, Patch, Post} from "@tsed/common";

@Controller("/games")
export class CalendarCtrl {
  @Get()
  findAll(): string {
    return "This action returns all calendars";
  }
  @Post()
  createNewGame(): string {
    return "This action returns all calendars";
  }
  @Patch("/save")
  saveGame(): string {
    return "This action returns all calendars";
  }
  @Patch("/resume")
  resumeGame(): string {
    return "This action returns all calendars";
  }
  @Patch("/click")
  clickCell(): string {
    return "This action returns all calendars";
  }
}