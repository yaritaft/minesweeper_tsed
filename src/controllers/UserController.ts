import {BodyParams, Controller, Inject, Post} from "@tsed/common";
import { TokenHeader } from "../models/Session.entity";
import { User } from "../models/User.entity";
import { UserService } from '../services/UserService';

@Controller("/user")
export class UserController {
  @Inject()
  userService: UserService;

  @Post("/register")
  async register(@BodyParams() body: User): Promise<string> {
    const userId = await this.userService.register(body);
    return userId;
  }

  @Post("/login")
  async login(@BodyParams() body: {email: string, password: string}): Promise<TokenHeader> {
    const token = await this.userService.login(body.email, body.password);
    return token;
  }
}