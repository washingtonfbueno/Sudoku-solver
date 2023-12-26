import React, { useContext, useEffect, useState } from "react";
import { SudokuContext } from "../App";

interface Props {}

export const SudokuGrid: React.FC<Props> = () => {
    const { grid, handleChangedValue } = useContext(SudokuContext)!;
    return (
        <div className="grid grid-cols-9 font-[700] text-3xl">
            {grid.map((row, y) =>
                row.map(({ value, type }, x) => (
                    <input
                        type="text"
                        key={`${x}${y}`}
                        value={value}
                        onChange={(event) => handleChangedValue(event, x, y)}
                        className={`h-16 w-16 text-center ${
                            type == "error"
                                ? "focus:bg-red-500 bg-red-500 text-white"
                                : type == "success"
                                ? "focus:bg-blue-300 bg-blue-300 text-white"
                                : "focus:bg-black"
                        } focus:text-white ${
                            (x + 1) % 3
                                ? "border-black border-r-[0.1rem]"
                                : "border-black border-r-[0.2rem]"
                        } ${
                            (y + 1) % 3
                                ? "border-black border-b-[0.1rem]"
                                : "border-black border-b-[0.2rem]"
                        } `}
                    />
                ))
            )}
        </div>
    );
};
