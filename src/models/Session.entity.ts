import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Session {
  @PrimaryGeneratedColumn("uuid")
  token: string;
  @Column()
  userId: string;
}

export interface TokenHeader{
    authentication: string;
}