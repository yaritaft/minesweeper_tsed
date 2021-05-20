import {Controller, Get, Patch, Post} from "@tsed/common";

@Controller("/games")
export class CalendarCtrl {
  @Post()
  createNewUser(): string {
    return "This action returns all calendars";
  }
  @Post("/login")
  login(): string {
    return "This action returns all calendars";
  }
}