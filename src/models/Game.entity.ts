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
    gameId: string;
    @Column({type: 'jsonb', nullable: true})
    matrix?: {
      matrix: Cell[][] 
    };
    @Column()
    state: GameState;
    @Column()
    amountOfMines: number;
    @Column()
    userId: string;
    @Column()
    secondsElapsed: number;
    @Column()
    createdAt: Date;
    @Column()
    finishedAt?: Date;
  }