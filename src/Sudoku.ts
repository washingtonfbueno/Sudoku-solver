import { unsolvedSudokuGrids } from "./unsolvedSudokuGrids";

export class Sudoku {
    grid: { value: string; type: string }[][];
    output: { x: number; y: number; value: string; type: string }[];

    constructor() {
        this.grid = this.createEmptyGrid();
        this.output = [];
    }

    reset() {
        this.grid = this.createEmptyGrid();
        this.output = [];
    }

    createEmptyGrid = () => {
        let grid: { value: string; type: string }[][] = [];

        for (let i = 0; i < 9; i++) {
            grid.push([]);

            for (let j = 0; j < 9; j++) {
                grid[i].push({ value: "", type: "normal" });
            }
        }

        return grid;
    };

    useRandomSudokuGrid() {
        let grid: { value: string; type: string }[][] = [];
        const chosenGrid = Math.floor(
            Math.random() * unsolvedSudokuGrids.length
        );

        for (let i = 0; i < 9; i++) {
            grid.push([]);

            for (let j = 0; j < 9; j++) {
                grid[i].push({
                    value: unsolvedSudokuGrids[chosenGrid][i][j],
                    type: "normal",
                });
            }
        }

        this.grid = grid;
        this.output = [];
    }

    validNumber(number: string, x: number, y: number) {
        let startX = Math.floor(x / 3) * 3;
        let startY = Math.floor(y / 3) * 3;

        for (let i = startY; i < startY + 3; i++) {
            for (let j = startX; j < startX + 3; j++) {
                if (this.grid[i][j].value === number && (i !== y || j !== x)) {
                    return false;
                }
            }
        }

        if (this.grid[y].filter((obj) => obj.value == number).length > 0) {
            return false;
        }

        for (let row of this.grid) {
            if (row[x].value && row[x].value == number) {
                return false;
            }
        }

        return true;
    }

    solveSudoku():
        | { x: number; y: number; value: string; type: string }[]
        | undefined {
        const helper = (m: number, n: number) => {
            for (let y = 0; y < 9; y++) {
                for (let x = 0; x < 9; x++) {
                    if (!this.grid[y][x].value) {
                        for (let number = 1; number <= 9; number++) {
                            if (this.validNumber(number.toString(), x, y)) {
                                this.grid[y][x].value = number.toString();
                                this.output.push({
                                    x,
                                    y,
                                    value: number.toString(),
                                    type: "success",
                                });

                                helper(m, n);

                                if (this.grid[m][n].value) {
                                    return this.output;
                                }

                                this.grid[y][x].value = "";
                                this.output.push({
                                    x,
                                    y,
                                    value: "",
                                    type: "",
                                });
                            }
                        }
                        return;
                    }
                }
            }
        };

        for (let y = 8; y >= 0; y--) {
            for (let x = 8; x >= 0; x--) {
                if (!this.grid[y][x].value) {
                    return helper(y, x);
                }
            }
        }

        throw new Error("This sudoku is already solved!");
    }
}
