import "./index.css";

import { SudokuGrid } from "./components/SudokuGrid";
import { useEffect, useState } from "react";
import { ResultGrid } from "./components/ResultGrid";
import { Sudoku } from "./Sudoku";

function App() {
    const createEmptyGrid = () => {
        return [...Array(9)].map((row) =>
            [...Array(9)].map((col) => {
                return { gridItem: "", error: false };
            })
        );
    };

    const [resultGrid, setResultGrid] = useState<
        { gridItem: string; error: boolean }[][] | undefined
    >();
    const [grid, setGrid] = useState<{ gridItem: string; error: boolean }[][]>(
        createEmptyGrid()
    );

    useEffect(() => {
        const gridToBeSolved = grid.map((row) =>
            row.map((col) => {
                return { ...col };
            })
        );

        const sudoku = new Sudoku(gridToBeSolved);
        setResultGrid(sudoku.solve());
    }, [grid]);

    return (
        <div className="flex flex-col h-screen items-center justify-center bg-gray-600 space-y-12">
            <h1 className="text-gray-300 text-[4rem]">Sudoku solver</h1>
            <p className="text-[2rem] text-gray-300">
                Enter a valid sudoku puzzle to be solved
            </p>
            <div className="flex space-y-20 md:space-y-0 md:space-x-20 flex-col md:flex-row">
                <SudokuGrid {...{ grid, setGrid }} />
                <ResultGrid {...{ resultGrid }} />
            </div>

            <div className="flex space-x-8">
                <button
                    onClick={() => setGrid(createEmptyGrid())}
                    className="text-gray-200 text-[2rem] bg-slate-500 rounded-2xl py-2 px-5 hover:bg-slate-400 focus:outline-none"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default App;
