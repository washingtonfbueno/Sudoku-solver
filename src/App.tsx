import "./index.css";

import { SudokuGrid } from "./components/SudokuGrid";
import { useState } from "react";
import { Sudoku } from "./Sudoku";
import { createContext } from "react";

interface SudokuC {
    grid: { value: string; type: string }[][];
    handleChangedValue: (
        event: React.FormEvent<HTMLInputElement>,
        x: number,
        y: number
    ) => void;
    solved: boolean;
}

const sudoku = new Sudoku();

export const SudokuContext = createContext<SudokuC | undefined>(undefined);

function App() {
    const [grid, setGrid] = useState<{ value: string; type: string }[][]>(
        JSON.parse(JSON.stringify(sudoku.grid))
    );

    const [solving, setSolving] = useState(false);
    const [solved, setSolved] = useState(false);

    const handleChangedValue = async (
        event: React.FormEvent<HTMLInputElement>,
        x: number,
        y: number
    ) => {
        const value = event.currentTarget.value;

        if (!value.match(/^[1-9]$|^$/)) {
            return;
        }

        if (!sudoku.validNumber(value, x, y)) {
            sudoku.grid[y][x].type = "error";
            setGrid(JSON.parse(JSON.stringify(sudoku.grid)));

            await new Promise((r) => setTimeout(r, 1000));
            sudoku.grid[y][x].type = "normal";
            setGrid(JSON.parse(JSON.stringify(sudoku.grid)));
            return;
        }

        sudoku.grid[y][x].value = value;
        setGrid(JSON.parse(JSON.stringify(sudoku.grid)));
    };

    const solve = async () => {
        setSolving(true);
        setSolved(true);
        let output: { x: number; y: number; value: string; type: string }[] =
            [];

        const setValues = async () => {
            for (let { x, y, value, type } of output) {
                grid[y][x].value = value;
                grid[y][x].type = type;

                setGrid([...grid]);
                await new Promise((r) => setTimeout(r, 5));
            }
        };

        output = sudoku.solveSudoku()!;
        await setValues();

        setSolving(false);
    };

    return (
        <SudokuContext.Provider value={{ grid, handleChangedValue, solved }}>
            <div className="flex flex-col h-screen items-center justify-center space-y-12 font-sans">
                <div className="flex flex-col items-center">
                    <h1 className="text-blue-300 text-[5rem] font-[700]">
                        Sudoku Solver
                    </h1>
                    <p className="text-[2rem] text-black font-[300]">
                        Enter a valid sudoku puzzle to be solved
                    </p>
                </div>

                <SudokuGrid />

                <div className="space-x-4">
                    <button
                        onClick={() => solve()}
                        className={`text-gray-200 text-[2rem] bg-blue-300 rounded-2xl py-2 w-56 hover:bg-blue-400 focus:outline-none ${
                            solved && "hidden"
                        }`}
                    >
                        Solve
                    </button>

                    <button
                        onClick={() => {
                            sudoku.reset();
                            setSolved(false);
                            setGrid(JSON.parse(JSON.stringify(sudoku.grid)));
                        }}
                        className={`text-gray-200 text-[2rem] bg-red-300 rounded-2xl py-2 w-56 hover:bg-red-400 focus:outline-none ${
                            solving ? "hidden" : ""
                        }`}
                    >
                        Reset
                    </button>

                    <button
                        onClick={() => {
                            sudoku.useRandomSudokuGrid();
                            setSolved(false);
                            setGrid(JSON.parse(JSON.stringify(sudoku.grid)));
                        }}
                        className={`text-gray-200 text-[2rem] bg-gray-400 rounded-2xl py-2 w-56 hover:bg-gray-500 focus:outline-none ${
                            solving ? "hidden" : ""
                        }`}
                    >
                        Randomize
                    </button>
                </div>
            </div>
        </SudokuContext.Provider>
    );
}

export default App;
