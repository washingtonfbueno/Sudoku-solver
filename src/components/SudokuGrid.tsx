import React, { useEffect, useState } from "react";
import { Sudoku } from "../Sudoku";

interface Props {
    grid: { gridItem: string; error: boolean }[][];
    setGrid: React.Dispatch<
        React.SetStateAction<{ gridItem: string; error: boolean }[][]>
    >;
}

export const SudokuGrid: React.FC<Props> = ({ grid, setGrid }) => {
    const handleChangedValue = (
        event: React.FormEvent<HTMLInputElement>,
        x: number,
        y: number
    ) => {
        const value = event.currentTarget.value;

        // Regular expression to only allow inputs from 1 to 9 or empty inputs
        if (!value.match(/^[1-9]$|^$/)) {
            return;
        }

        const sudoku = new Sudoku([...grid]);
        if (!sudoku.validNumber(event.currentTarget.value, x, y)) {
            if (!grid[y][x].error) {
                grid[y][x].error = true;
                setGrid([...grid]);
                setTimeout(() => {
                    grid[y][x].error = false;
                    setGrid([...grid]);
                }, 2000);
            }

            return;
        }

        grid[y][x].gridItem = value;
        setGrid([...grid]);
    };

    return (
        <div className="grid grid-cols-9 text-2xl md:text-3xl">
            {grid.map((row, y) =>
                row.map(({ gridItem, error }, x) => (
                    <input
                        type="text"
                        key={`${x}${y}`}
                        value={gridItem}
                        onChange={(event) => handleChangedValue(event, x, y)}
                        className={`h-16 w-16 text-center ${
                            error
                                ? "focus:bg-[#FA8072] bg-[#FA8072] text-white"
                                : "focus:bg-gray-600"
                        } focus:text-white ${
                            (x + 1) % 3
                                ? "border-gray-600 border-r-[0.1rem]"
                                : "border-gray-600 border-r-[0.5rem]"
                        } ${
                            (y + 1) % 3
                                ? "border-gray-600 border-b-[0.1rem]"
                                : "border-gray-600 border-b-[0.5rem]"
                        } `}
                    />
                ))
            )}
        </div>
    );
};
