import {Module} from "@tsed/di";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Module()
@Entity()
export class Calendar {
    @PrimaryGeneratedColumn()
    _id: string;
}