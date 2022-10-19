export class Sudoku {
    grid: { gridItem: string; error: boolean }[][];

    constructor(grid: { gridItem: string; error: boolean }[][]) {
        this.grid = grid;
    }

    //Checks if the number can be placed in the empty space
    validNumber(number: string, x: number, y: number) {
        let xi = Math.floor(x / 3) * 3;
        let yi = Math.floor(y / 3) * 3;

        for (let row = 0; row < 3; row++) {
            if (
                this.grid[yi + row]
                    .slice(xi, xi + 3)
                    .filter((obj) => obj.gridItem && obj.gridItem == number)
                    .length > 0
            ) {
                return false;
            }
        }

        if (
            this.grid[y].filter((obj) => obj.gridItem && obj.gridItem == number)
                .length > 0
        ) {
            return false;
        }

        for (let row of this.grid) {
            if (row[x].gridItem && row[x].gridItem == number) {
                return false;
            }
        }

        return true;
    }

    solve() {
        const helper = (m: number, n: number) => {
            for (let y = 0; y < 9; y++) {
                for (let x = 0; x < 9; x++) {
                    if (!this.grid[y][x].gridItem) {
                        for (let number = 1; number <= 9; number++) {
                            if (this.validNumber(number.toString(), x, y)) {
                                this.grid[y][x].gridItem = number.toString();
                                helper(m, n);
                                if (this.grid[m][n].gridItem) {
                                    return this.grid;
                                }
                                this.grid[y][x].gridItem = "";
                            }
                        }
                        return;
                    }
                }
            }
        };

        for (let y = 8; y >= 0; y--) {
            for (let x = 8; x >= 0; x--) {
                if (!this.grid[y][x].gridItem) {
                    return helper(y, x);
                }
            }
        }
    }
}
