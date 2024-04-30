"use client";
import React from "react";
import { BiBowlRice } from "react-icons/bi";
import { GiShrimp } from "react-icons/gi";
import { LuSoup } from "react-icons/lu";
import { PiPlantLight } from "react-icons/pi";
import { GiCakeSlice } from "react-icons/gi";
import { GiBarbecue } from "react-icons/gi";

type Props = {
    onCatagoryClick: (value: string) => void;
};

export const category: React.FC<Props> = ({ onCatagoryClick }) => {
    return (
        <div className="w-auto h-auto rounded-lg flex flex-wrap font-bold text-sm text-slate-500  space-x-4 ">
            <button
                onClick={() => {
                    onCatagoryClick("Main Courses");
                }}
                className="btn btn-pimary rounded-full  w-[15%]  h-full text-slate-500  "
            >
                <BiBowlRice className="  text-3xl " />
                Main Courses
            </button>
            <button
                onClick={() => {
                    onCatagoryClick("Seafood");
                }}
                className="btn btn-pimary rounded-full w-[15%]  h-full text-slate-500 "
            >
                <GiShrimp className="  text-3xl" />
                Seafood
            </button>
            <button
                onClick={() => {
                    onCatagoryClick("Appetizers");
                }}
                className="btn btn-pimary rounded-full w-[15%]  h-full text-slate-500 "
            >
                <LuSoup className=" text-3xl" />
                Appetizers
            </button>
            <button
                onClick={() => {
                    onCatagoryClick("Salads");
                }}
                className="btn btn-pimary rounded-full  w-[15%] h-full text-slate-500 "
            >
                <PiPlantLight className=" text-3xl" />
                Salads
            </button>
            <button
                onClick={() => {
                    onCatagoryClick("Desserts");
                }}
                className="btn btn-pimary rounded-full  w-[15%] h-full text-slate-500 "
            >
                <GiCakeSlice className=" text-3xl" />
                Desserts
            </button>
            <button
                onClick={() => {
                    onCatagoryClick("Barbecue");
                }}
                className="btn btn-pimary rounded-full w-[15%] h-full text-slate-500 "
            >
                <GiBarbecue className=" text-3xl" />
                Barbecue
            </button>{" "}
        </div>
    );
};

export default category;
