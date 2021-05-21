import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
export enum CellState {
    Flagged = "Flagged",
    Checked = "Checked",
    Question = "Question",
    Unchecked = "Unchecked",
  }
  
  export enum GameState {
    InProgress = "InProgress",
    Stopped = "Stopped",
    Won = "Won",
    Lost = "Lost",
  }
  
  export interface CellCoordinates {
    x: number;
    y: number;
  }
  
  export class Cell {
    state: CellState;
    mine: boolean;
  }
  
  @Entity()
  export class Game {
    @PrimaryGeneratedColumn("uuid")
    gameId?: string;
    @Column({type: 'jsonb', nullable: true})
    matrix?: Cell[][] 
    @Column()
    state: GameState;
    @Column()
    amountOfMines: number;
    @Column()
    userId: string;
    @Column({nullable: true})
    secondsElapsed?: number;
    @Column({nullable: true})
    secondsStopped?: number;
    @Column()
    createdAt: Date;
    @Column({nullable: true})
    finishedAt?: Date;
    @Column({nullable: true})
    stoppedAt?: Date;
    @Column({nullable: true})
    resumedAt?: Date;
  }