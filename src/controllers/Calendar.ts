import {Controller, Get} from "@tsed/common";

@Controller("/calendars")
export class Calendar {
  @Get()
  findAll(): string {
    return "This action returns all calendars";
  }
}