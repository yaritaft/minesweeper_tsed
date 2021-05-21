import { User } from "../models/User.entity";

export class UserCoreService {
    private generateSalt(): string {
        return String(Math.floor(Math.random()*10000000));
    }

    addEncodedPassword(user: User): User {
      user.salt = this.generateSalt();
      user.password = Buffer.from(user.userId+user.salt+user.password).toString('base64');
      return user;
    }

    decodePassword(user: User): string {
        const rawPassword = Buffer.from(user.password, 'base64').toString();
        const prefix = user.userId + user.salt;
        const password = rawPassword.substr(prefix.length);
        return password;
    }
}  