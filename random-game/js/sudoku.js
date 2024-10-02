import { createSudoku } from "./sudokuCreator.js";

export class Sudoku {
    constructor() {
        this.grid = createSudoku();
    }
}