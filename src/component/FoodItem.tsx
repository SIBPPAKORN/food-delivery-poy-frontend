"use client";
import { foodItemsType } from "@/data_service/foods/getFoodItem";
import React from "react";
import { IoStorefrontOutline } from "react-icons/io5";
import { FaStore } from "react-icons/fa";

type Props = {
    foodItemAll: foodItemsType[];

    clickAddCart: (value: foodItemsType) => void;
};
export const FoodIteminfo: React.FC<Props> = ({
    foodItemAll,

    clickAddCart,
}) => {
    return (
        <section className="w-full h-auto flex flex-wrap gap-4 rounded-lg font-bold text-sm text-black">
            {foodItemAll.map((item, index) => (
                // กดเพิ่ม Product ไปที่ Cart
                <div
                    className=" h-[50%] w-[calc(33.33%-16px)] bg-slate-100 rounded-lg flex flex-wrap"
                    key={index}
                    onClick={() => clickAddCart(item)}
                >
                    <div className="flex-1">
                        <p className="mx-auto text-sm ml-2 mb-2">
                            {item.distance}
                        </p>
                    </div>

                    <div className="flex-1">
                        <p className="mx-auto text-sm text-right mr-2">
                            {item.distime}
                        </p>
                    </div>

                    <button className=" w-full ">
                        <picture className="flex items-center w-full h-full mx-auto">
                            <img
                                src={item.img}
                                alt={item.name}
                                className="object-cover rounded-md  mr-5"
                            />
                        </picture>
                    </button>

                    <div className="flex-1">
                        <p className="mx-auto text-sm ml-2 mb-2">{item.name}</p>
                    </div>

                    <div className="flex-1">
                        <p className="mx-auto text-sm text-right mr-2">
                            ${item.price}
                        </p>
                    </div>

                    <div className="flex-1">
                        <p className="mx-auto text-sm text-right mr-2">
                            {item.category}
                        </p>
                    </div>
                    <div className="">
                        <p className="mx-auto text-sm text-right mr-2 flex">
                            |<IoStorefrontOutline />
                            {item.store_name}|
                        </p>
                    </div>
                </div>
            ))}
        </section>
    );
};
export default FoodIteminfo;
