import "reflect-metadata";
import { Service } from "@tsed/di";
import { Injectable } from "@tsed/common";
import { Connection } from "typeorm";
import { ORMService } from "./ORMService";
import { Session } from "../models/Session.entity";

@Service()
@Injectable()
export class SessionService {
  constructor(private ormService: ORMService) {
  }

  async gatherUserIdByToken(token: string): Promise<string> {
    const repository = this.ormService.connection.getRepository(Session);
    const session = await repository.findOne({token});
    return session.userId;
  }

  async generateToken(userId: string): Promise<string> {
    const repository = this.ormService.connection.getRepository(Session);
    const session = await repository.save({userId});
    console.log("Token generated.")
    return session.token;
  }

  async getTokenByUserId(userId: string): Promise<string>{
    const repository = this.ormService.connection.getRepository(Session);
    const session = await repository.findOne({userId});
    return session.token;
  }
}
