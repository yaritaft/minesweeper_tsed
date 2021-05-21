import "reflect-metadata";
import { Service } from "@tsed/di";
import { Injectable } from "@tsed/common";
import { ORMService } from "./ORMService";
import { Game } from "../models/Game.entity";
import { SessionService } from './SessionService';
import { User } from "../models/User.entity";
import { UserCoreService } from "../core/UserCore";
import { TokenHeader } from "../models/Session.entity";

class WrongPasswordError extends Error {
    constructor(message: string){
        super(message);
        console.error(message);
    }
}

class WrongEmailError extends Error {
    constructor(message: string){
        super(message);
        console.error(message);
    }
}

@Service()
@Injectable()
export class UserService {
  constructor(private ormService: ORMService, private sessionService: SessionService, private userCoreService: UserCoreService) {
  }

  async login(email: string, password: string): Promise<TokenHeader> {
    const userRepository = this.ormService.connection.getRepository(User);
    const user = await userRepository.findOne({ email});
    const storedPassword = this.userCoreService.decodePassword(user);
    if (!user){
        throw new WrongEmailError("A wrong email was provided.");
    }  
    if (storedPassword!==password){
        throw new WrongPasswordError("A wrong password was provided.");
    }    
    const token = await this.sessionService.getTokenByUserId(user.userId);
    return {authentication: token};
  }

  async register( userData: User ): Promise<string> {
      const user = new User();
      const repository = this.ormService.connection.getRepository(User);
      const newUserInstance = repository.merge(user, userData);
      const userWithoutPassword = await this.ormService.upsert<User>(newUserInstance);
      const userWithPassword = this.userCoreService.addEncodedPassword(userWithoutPassword);
      const result = await this.ormService.upsert<User>(userWithPassword);
    const token = await this.sessionService.generateToken(result.userId);
    console.log("User registered.");
    return `userId: ${result.userId}`;
  }

}
