import "reflect-metadata";
import { Cell, CellCoordinates, CellState, Game, GameState } from "../models/Game.entity";

export class GameCoreService {
    clickMine(matrix: Game): Game {
      matrix.state = GameState.Lost;
      matrix.matrix = undefined;
      return matrix;
    }
    
    getAdjacentCells(matrix: Cell[][], x: number, y: number): CellCoordinates[]{
      const adjacentCellsCordinates: CellCoordinates[] = [];
      for (let row = x - 1; row < x + 2; row++) {
        for (let column = y - 1; column < y + 2; column++) {
          const cell = matrix?.[row]?.[column];
          if (cell?.mine) {
            return [];
          }
          if (cell !== undefined && cell.state === CellState.Unchecked && !cell.mine) {
            const cellCoordinates: CellCoordinates = { x: row, y: column };
            adjacentCellsCordinates.push(cellCoordinates);
          }
        }
      } // x+2 because It is included x+1
      return adjacentCellsCordinates;
    }
    
    setCellStatus(matrix: Cell[][], x: number, y: number, status: CellState): void {
      matrix[x][y].state = status;
    }
    
    getAdjacentCellsAndCheckMine(
      matrix: Cell[][],
      x: number,
      y: number
    ): { hasAdjacentMine: boolean; adjacentCellsCordinates: CellCoordinates[] } {
      const adjacentCellsCordinates = this.getAdjacentCells(matrix, x, y);
      const hasAdjacentMine = adjacentCellsCordinates.some((oneCell) => matrix[oneCell.x][oneCell.y].mine);
      return { hasAdjacentMine, adjacentCellsCordinates };
    }
  
    clickSafeCell (matrix: Cell[][], x: number, y: number): void {
      // setCellStatus(matrix, x, y, CellState.Checked)
      const result = this.getAdjacentCellsAndCheckMine(matrix, x, y);
      if (result.hasAdjacentMine) {
        return;
      }
      if (!result.hasAdjacentMine) {
        result.adjacentCellsCordinates.forEach((aCell) => this.setCellStatus(matrix, aCell.x, aCell.y, CellState.Checked));
        for (const cell of result.adjacentCellsCordinates) {
          this.clickSafeCell(matrix, cell.x, cell.y);
        }
      }
    }
    
    checkWonGame (game: Game):boolean {
        for(const rows of game.matrix.matrix){
            for (const cell of rows){
                if (!cell.mine && cell.state !== CellState.Checked){
                    return false;
                }
            }
        }
        game.state = GameState.Won;
        console.log("You won!");
        return true;
    }
    
    clickCell(game: Game, x: number, y: number): Game {
      if (game.matrix.matrix[x][y].mine) {
        return this.clickMine(game);
      }
      this.setCellStatus(game.matrix.matrix, x, y, CellState.Checked);
      this.clickSafeCell(game.matrix.matrix, x, y);
      this.checkWonGame(game);
      return game;
    }
    
    generateRandomCellCoordinate(x: number, y: number): CellCoordinates {
      const randomCellCoordinate: CellCoordinates = {
        x: Math.floor(Math.random() * x),
        y: Math.floor(Math.random() * y),
      };
      return randomCellCoordinate;
    }
    
    lookForExistingRandomCell(mineCells: CellCoordinates[], randomCellCoordinate: CellCoordinates): boolean {
      if (mineCells.length === 0) {
        return false;
      }
      return mineCells.some((mineCell) => JSON.stringify(mineCell) === JSON.stringify(randomCellCoordinate));
    }
    
    generateRandomMineCells (amountOfCells: number, x: number, y: number, ): CellCoordinates[] {
      let mineCells: CellCoordinates[] = [];
      for (let index = 0; index < amountOfCells; index++) {
        let randomCell = this.generateRandomCellCoordinate(x, y);
        while (this.lookForExistingRandomCell(mineCells, randomCell)) {
          randomCell = this.generateRandomCellCoordinate(x, y);
        }
        mineCells.push(randomCell);
      }
      return mineCells;
    }
    
    setMinesInGame (cellCoordinates: CellCoordinates[], game: Game): Game {
      cellCoordinates.map((cellCoordinate) => {
        game.matrix.matrix[cellCoordinate.x][cellCoordinate.y].mine = true;
      });
      return game;
    }
    
    validateAmountOfMines (amountOfMines: number, rows: number, columns: number): boolean {
      return amountOfMines <= rows * columns;
    }
    
    createMatrixCellsWithoutMines (rows: number, columns: number): Cell[][] {
      const matrixCells: Cell[][] = [];
      for (let row = 0; row < rows; row++) {
        matrixCells.push([]);
      }
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const defaultCell: Cell = { state: CellState.Unchecked, mine: false };
          matrixCells[row].push(defaultCell);
        }
      }
      return matrixCells;
    }
    
    createNewGame (amountOfMines: number, rows: number, columns: number): Game {
      if (!this.validateAmountOfMines(amountOfMines, rows, columns)) {
        throw new Error("Invalid danger probability.");
      }
      const randomCells = this.generateRandomMineCells(amountOfMines, rows, columns);
      const matrixCellsWithoutMines = this.createMatrixCellsWithoutMines(rows, columns);
      const gameWithoutMines: Game = {
        matrix: {
          matrix: matrixCellsWithoutMines,
        },
        gameId: "1", // TODO: YARI SET UP UUID HERE
        state: GameState.InProgress,
        amountOfMines,
        userId: "aaa",
        createdAt: new Date(),
        secondsElapsed: 0,
      };
        const game = this.setMinesInGame(randomCells, gameWithoutMines);
      return game;
    }
    
    printMatrix (matrix: Cell[][]) {
      for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].map((y) => (y.state === CellState.Checked ? 1 : 0)));
      }
    }
  }