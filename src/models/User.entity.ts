import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  userId?: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({unique: true})
  email: string;
  @Column({nullable: true})
  password?: string;
  @Column({default: new Date()})
  createdAt?: Date;
  @Column({nullable: true})
  salt?: string;
}