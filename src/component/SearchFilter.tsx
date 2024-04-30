"use client";
import React, { useState } from "react";
import { GiSettingsKnobs } from "react-icons/gi";
type Props = {
    onSubmit: (value: string) => void;
};
export const Search: React.FC<Props> = ({ onSubmit }) => {
    const [searchTextState, setSearchTextState] = useState<string>("");

    return (
        <div className="static w-[70%]  space-x-4  flex flex-nowrap text-slate-600">
            <div className="w-[90%]  space-x-4  flex flex-nowrap text-slate-600">
                <input
                    value={searchTextState}
                    type="text"
                    className="input rounded-full bg-white w-full "
                    placeholder=" ค้นหาเมนูอาหาร "
                    onChange={(event) => {
                        setSearchTextState(event.target.value);
                    }}
                />

                <button
                    className="btn btn-pimary rounded-full w-[15%] text-slate-500 flex flex-wrap "
                    onClick={() => onSubmit(searchTextState)}
                >
                    <GiSettingsKnobs className=" text-xl font-bold" />
                    Filter
                </button>
            </div>
        </div>
    );
};

export default Search;
