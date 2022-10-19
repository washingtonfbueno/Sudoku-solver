import React, { useState } from "react";

interface Props {
    resultGrid: { gridItem: string; error: boolean }[][] | undefined;
}

export const ResultGrid: React.FC<Props> = ({ resultGrid }) => {
    return (
        <div className="grid grid-cols-9 text-2xl md:text-3xl">
            {resultGrid?.map((row, y) =>
                row.map(({ gridItem }, x) => (
                    <div
                        key={`${x}${y}`}
                        className={`h-16 w-16 text-white flex items-center justify-center ${
                            (x + 1) % 3
                                ? "border-white border-r-[0.1rem]"
                                : "border-white border-r-[0.5rem]"
                        } ${
                            (y + 1) % 3
                                ? "border-white border-b-[0.1rem]"
                                : "border-white border-b-[0.5rem]"
                        } `}
                    >
                        {gridItem}
                    </div>
                ))
            )}
        </div>
    );
};
