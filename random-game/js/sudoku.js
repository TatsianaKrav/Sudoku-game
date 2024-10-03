import { createSudoku, findEmptyCell } from "./sudokuCreator.js";

export class Sudoku {
    constructor() {
        this.grid = createSudoku();
    }

    hasEmptyCell() {
        return findEmptyCell(this.grid.clearedGrid);
    }
}