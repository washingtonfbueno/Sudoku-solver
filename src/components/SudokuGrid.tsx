import React, { useContext } from "react";
import { SudokuContext } from "../App";

interface Props {}

export const SudokuGrid: React.FC<Props> = () => {
    const { grid, handleChangedValue, solved } = useContext(SudokuContext)!;

    return (
        <div className="grid grid-cols-9 font-[400] text-3xl border-[0.2rem] border-black">
            {grid.map((row, y) =>
                row.map(({ value, type }, x) => (
                    <input
                        disabled={solved}
                        type="text"
                        inputMode="numeric"
                        key={`${x}${y}`}
                        value={value}
                        onChange={(event) => handleChangedValue(event, x, y)}
                        className={`h-[5rem] w-[5rem] text-center 
                        ${
                            type == "error" &&
                            "focus:bg-red-500 focus:text-white"
                        }
                        ${type == "success" && "bg-blue-300 text-white"}
                        ${type == "normal" && "focus:bg-black focus:text-white"}
                                
                        ${
                            x % 3 == 0 && x
                                ? "border-black border-l-[0.2rem]"
                                : x && "border-black border-l-[0.1rem]"
                        } 
                       
                        ${
                            y % 3 == 0 && y
                                ? "border-black border-t-[0.2rem]"
                                : y && "border-black border-t-[0.1rem]"
                        }
                         `}
                    />
                ))
            )}
        </div>
    );
};
