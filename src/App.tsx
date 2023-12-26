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
}

const sudoku = new Sudoku();

export const SudokuContext = createContext<SudokuC | undefined>(undefined);

function App() {
    const [grid, setGrid] = useState<{ value: string; type: string }[][]>(
        JSON.parse(JSON.stringify(sudoku.grid))
    );

    const [solving, setSolving] = useState(false);

    const handleChangedValue = (
        event: React.FormEvent<HTMLInputElement>,
        x: number,
        y: number
    ) => {
        const value = event.currentTarget.value;

        if (!value.match(/^[1-9]$|^$/)) {
            return;
        }

        sudoku.grid[y][x].value = value;

        setGrid(JSON.parse(JSON.stringify(sudoku.grid)));
    };

    const solve = async () => {
        setSolving(true);

        let output: { x: number; y: number; value: string; type: string }[] =
            [];

        const setValues = async () => {
            for (let { x, y, value, type } of output) {
                const newGrid = [...grid];

                newGrid[y][x].value = value;
                newGrid[y][x].type = type;

                setGrid(newGrid);
                await new Promise((r) => setTimeout(r, 10000 / output.length));
            }
        };

        try {
            output = sudoku.solveSudoku()!;
            await setValues();
        } catch (err) {
            console.log(err);
        }

        setSolving(false);
    };

    return (
        <SudokuContext.Provider value={{ grid, handleChangedValue }}>
            <div className="flex flex-col h-screen items-center justify-center space-y-12 font-sans">
                <div className="flex flex-col items-center">
                    <h1 className="text-blue-300 text-[5rem] font-[700]">
                        Sudoku Solver
                    </h1>
                    <p className="text-[2rem] text-black font-[300]">
                        Enter a valid sudoku puzzle to be solved
                    </p>
                </div>
                <div className="flex space-y-20 md:space-y-0 md:space-x-20 flex-col md:flex-row">
                    <SudokuGrid />
                </div>

                <div className="flex space-x-8">
                    <button
                        onClick={() => solve()}
                        className={`text-gray-200 text-[2rem] bg-blue-300 rounded-2xl py-2 px-5 hover:bg-blue-400 focus:outline-none ${
                            solving && "hidden"
                        }`}
                    >
                        Solve
                    </button>

                    <button
                        onClick={() => {
                            sudoku.reset();
                            setGrid(JSON.parse(JSON.stringify(sudoku.grid)));
                        }}
                        className={`text-gray-200 text-[2rem] bg-red-300 rounded-2xl py-2 px-5 hover:bg-red-400 focus:outline-none ${
                            solving ? "hidden" : ""
                        }`}
                    >
                        Reset
                    </button>

                    <button
                        onClick={() => {
                            sudoku.useRandomSudokuGrid();
                            setGrid(JSON.parse(JSON.stringify(sudoku.grid)));
                        }}
                        className={`text-gray-200 text-[2rem] bg-gray-400 rounded-2xl py-2 px-5 hover:bg-gray-500 focus:outline-none ${
                            solving ? "hidden" : ""
                        }`}
                    >
                        Random
                    </button>
                </div>
            </div>
        </SudokuContext.Provider>
    );
}

export default App;
