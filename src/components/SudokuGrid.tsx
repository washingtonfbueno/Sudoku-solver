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
                        key={`${x}${y}`}
                        value={value}
                        onChange={(event) => handleChangedValue(event, x, y)}
                        className={`h-[6rem] w-[6rem] text-center 
                        ${
                            type == "error" &&
                            "focus:bg-red-500 bg-red-500 text-white"
                        }
                        ${
                            type == "success" &&
                            "focus:bg-blue-300 bg-blue-300 text-white"
                        }
                        ${type == "normal" && "focus:bg-black"}
                                
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
