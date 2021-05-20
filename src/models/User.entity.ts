import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  userId: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  createdAt: Date;
}