import {Controller,Inject, Get} from "@tsed/common";
import { CalendarService } from '../services/CalendarService';

@Controller("/calendars")
export class CalendarController {
  @Inject()
  service: CalendarService;
  
  // OR from constructor
  constructor(private calendarService: CalendarService){
    console.log("Injecting calendar service in controller")
  
  }
  @Get()
  async findAll(): Promise<string> {
    const result = await this.calendarService.find();
    return JSON.stringify(result);
  }
}